import { Component, OnInit } from '@angular/core';
import { AdminPanelHeaderComponent } from "../admin-panel-header/admin-panel-header.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CatService } from "../../services/cat.service";
import { ToastrService } from "ngx-toastr";
import { Cat } from "../../models/cat.model";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-edit-cat',
  standalone: true,
  imports: [
    AdminPanelHeaderComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './edit-cat.component.html',
  styleUrls: ['./edit-cat.component.scss']
})
export class EditCatComponent implements OnInit {
  public catForm: FormGroup;
  public imagePreviews: string[] = [];
  public selectedFiles: File[] = [];
  public isLoading: boolean = false;
  catId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private catService: CatService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.catId = params.get('id');
      this.initializeForm();
      if (this.catId) {
        this.fetchCatData(this.catId);  // Fetch cat data when the component initializes
      }
    });
  }

  private initializeForm(): void {
    this.catForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      color: ['', [Validators.required, Validators.maxLength(100)]],
      age: ['', [Validators.required, Validators.maxLength(50)]],
      weight: ['', [Validators.required, Validators.maxLength(50)]],
      sex: ['', Validators.required],
      description: ['', Validators.required],
      images: ['', Validators.required],
    });
  }

  private fetchCatData(catId: string): void {
    this.catService.getCatById(catId).subscribe({
      next: (cat: Cat) => {
        this.catForm.patchValue({
          name: cat.name,
          color: cat.color,
          age: cat.age,
          weight: cat.weight,
          sex: cat.sex === 'Male' ? '1' : '2', // Assuming 1 for Male, 2 for Female
          description: cat.article,
          // Handle images if you want to prepopulate them
        });
        // You may also need to set image previews here if the API returns image data
        this.imagePreviews = cat.images.map(image => `data:${image.type};base64,${image.image}`);
      },
      error: (error) => {
        console.error('Error fetching cat data:', error);
        this.toastr.error('Could not fetch cat data. Please try again.', 'Error', {
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

  public submitCat(): void {
    this.isLoading = true;

    const formData = new FormData();
    const { name, color, age, weight, sex, description } = this.catForm.value;

    const sexValue = sex === '1' ? 'Male' : 'Female';

    const cat = new Cat();
    cat.name = name;
    cat.color = color;
    cat.age = age;
    cat.weight = weight;
    cat.sex = sexValue as 'Male' | 'Female';
    cat.article = description;

    formData.append(
      'cat',
      new Blob([JSON.stringify(cat)], { type: 'application/json' }),
    );

    this.selectedFiles.forEach((file) => {
      formData.append('imagefile', file, file.name);
    });

    console.log('Form Data:');
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    this.catService.updateCat(formData, this.catId).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Cat created successfully:', response);
        this.toastr.success(cat.name + ' created successfully', '', {
          timeOut: 3000,
        });
        this.catForm.reset();
        this.imagePreviews = [];
        this.selectedFiles = [];
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error creating cat:', error);
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
