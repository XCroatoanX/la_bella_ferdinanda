import { Component, OnInit } from '@angular/core';
import { AdminPanelHeaderComponent } from "../admin-panel-header/admin-panel-header.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import { KittenService } from "../../services/kitten.service";
import { ToastrService } from "ngx-toastr";
import { Kitten } from "../../models/kitten.model";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-edit-kitten',
  standalone: true,
  imports: [
    AdminPanelHeaderComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './edit-kitten.component.html',
  styleUrls: ['./edit-kitten.component.scss']
})
export class EditKittenComponent implements OnInit {
  public kittenForm: FormGroup;
  public imagePreviews: string[] = [];
  public selectedFiles: File[] = [];
  public isLoading: boolean = false;
  kittenId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private kittenService: KittenService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.kittenId = params.get('id');
      this.initializeForm();
      if (this.kittenId) {
        this.fetchKittenData(this.kittenId);  // Fetch kitten data when the component initializes
      }
    });
  }

  private initializeForm(): void {
    this.kittenForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      color: ['', [Validators.required, Validators.maxLength(100)]],
      age: ['', [Validators.required, Validators.maxLength(50)]],
      weight: ['', [Validators.required, Validators.maxLength(50)]],
      sex: ['', Validators.required],
      description: ['', Validators.required],
      images: ['', Validators.required],
      bornWeight: ['', [Validators.required]], // Add any additional fields for kittens
    });
  }

  private fetchKittenData(kittenId: string): void {
    this.kittenService.getKittenById(kittenId).subscribe({
      next: (kitten: Kitten) => {
        this.kittenForm.patchValue({
          name: kitten.name,
          color: kitten.color,
          age: kitten.age,
          weight: kitten.weight,
          sex: kitten.sex === 'Male' ? '1' : '2', // Assuming 1 for Male, 2 for Female
          description: kitten.article,
          bornWeight: kitten.bornWeight, // Populate additional fields if needed
          // Handle images if you want to prepopulate them
        });
        // You may also need to set image previews here if the API returns image data
        this.imagePreviews = kitten.images.map(image => `data:${image.type};base64,${image.image}`);
      },
      error: (error) => {
        console.error('Error fetching kitten data:', error);
        this.toastr.error('Could not fetch kitten data. Please try again.', 'Error', {
          timeOut: 3000,
        });
      }
    });
  }

  public handleFileInput(event: any): void {
    const files: File[] = Array.from(event.target.files);

    // Concatenate new files to the existing selectedFiles array
    this.selectedFiles = [...this.selectedFiles, ...files];

    // Iterate through new files to create previews
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Concatenate new image previews to the existing imagePreviews array
        this.imagePreviews.push(e.target.result);
      };
      reader.readAsDataURL(file);
    });
  }

  public removeImage(index: number): void {
    // Remove from image previews
    this.imagePreviews.splice(index, 1);
    // Remove from selected files
    this.selectedFiles.splice(index, 1);
  }

  public submitKitten(): void {
    this.isLoading = true;

    const formData = new FormData();
    const { name, color, age, weight, sex, description, bornWeight } = this.kittenForm.value;

    const sexValue = sex === '1' ? 'Male' : 'Female';

    const kitten = new Kitten();
    kitten.name = name;
    kitten.color = color;
    kitten.age = age;
    kitten.weight = weight;
    kitten.sex = sexValue as 'Male' | 'Female';
    kitten.article = description;
    kitten.bornWeight = bornWeight; // Ensure to include this in the kitten object

    formData.append(
      'kitten',
      new Blob([JSON.stringify(kitten)], { type: 'application/json' }),
    );

    this.selectedFiles.forEach((file) => {
      formData.append('imagefile', file, file.name);
    });

    console.log('Form Data:');
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    this.kittenService.updateKitten(formData, this.kittenId).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Kitten updated successfully:', response);
        this.toastr.success(kitten.name + ' updated successfully', '', {
          timeOut: 3000,
        });
        this.kittenForm.reset();
        this.imagePreviews = [];
        this.selectedFiles = [];
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error updating kitten:', error);
        switch (error.status) {
          case 400:
            this.toastr.error(
              'Bad Request: ' + (error.error || 'Please check your input.'),
              'Error',
              {
                timeOut: 3000,
              },
            );
            break;
          case 401:
            this.toastr.error(
              'Unauthorized: Please log in to continue.',
              'Error',
              {
                timeOut: 3000,
              },
            );
            break;
          case 413:
            this.toastr.error(
              'File too large: Please upload files smaller than 15 MB.',
              'Error',
              {
                timeOut: 3000,
              },
            );
            break;
          case 500:
            this.toastr.error(
              'Internal Server Error: Please try again later.',
              'Error',
              {
                timeOut: 3000,
              },
            );
            break;
          default:
            this.toastr.error(
              'An unexpected error occurred: ' +
              (error.error || 'Please try again later.'),
              'Error',
              {
                timeOut: 3000,
              },
            );
            break;
        }
      },
    });
  }
}
