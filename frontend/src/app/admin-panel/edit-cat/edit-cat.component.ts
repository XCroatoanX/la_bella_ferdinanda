import { Component, OnInit } from '@angular/core';
import { AdminPanelHeaderComponent } from '../admin-panel-header/admin-panel-header.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CatService } from '../../services/cat.service';
import { ToastrService } from 'ngx-toastr';
import { CatKit } from '../../models/catkit.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-cat',
  standalone: true,
  imports: [
    AdminPanelHeaderComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './edit-cat.component.html',
  styleUrls: ['./edit-cat.component.scss'],
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
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.catId = params.get('id');
      this.initializeForm();
      if (this.catId) {
        this.fetchCatData(this.catId);
      }
    });
  }

  private initializeForm(): void {
    this.catForm = this.fb.group({
      name: [''],
      color: [''],
      age: [''],
      sex: [''],
      description: [''],
      status: [''],
    });
  }

  private fetchCatData(catId: string): void {
    this.catService.getCatById(catId).subscribe({
      next: (cat: CatKit) => {
        this.catForm.patchValue({
          name: cat.name,
          color: cat.color,
          age: cat.age,
          sex: cat.sex === 'Male' ? '1' : '2',
          description: cat.article,
          status: cat.status === 'Available' ? '1' : cat.status === 'Reserved / Under discussion' ? '2' : cat.status === 'Sold' ? '3' : '4',
        });
        this.imagePreviews = cat.images.map(
          (image) => `data:${image.type};base64,${image.image}`,
        );
      },
      error: (error) => {
        console.error('Error fetching cat data:', error);
        this.toastr.error(
          'Could not fetch cat data. Please try again.',
          'Error',
          {
            timeOut: 3000,
          },
        );
      },
    });
  }

  public handleFileInput(event: any): void {
    const files: File[] = Array.from(event.target.files);

    this.selectedFiles = [...this.selectedFiles, ...files];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviews.push(e.target.result);
      };
      reader.readAsDataURL(file);
    });
  }

  public removeImage(index: number): void {
    this.imagePreviews.splice(index, 1);
    this.selectedFiles.splice(index, 1);
  }

  public submitCat(): void {
    this.isLoading = true;

    const formData = new FormData();
    const { name, color, age, sex, description, status } = this.catForm.value;

    const sexValue: string = sex === '1' ? 'Male' : 'Female';

    let statusValue: string = status === '1' ? 'Available' : status === '2' ? 'Reserved / Under discussion' : status === '3' ? 'Sold' : 'Not for sale';

    const cat = new CatKit();
    cat.name = name;
    cat.color = color;
    cat.age = age;
    cat.sex = sexValue as 'Male' | 'Female';
    cat.article = description;
    cat.status = statusValue as 'Available' | 'Reserved / Under discussion' | 'Adopted' | 'Not for sale';

    formData.append(
      'cat',
      new Blob([JSON.stringify(cat)], { type: 'application/json' }),
    );

    this.imagePreviews.forEach((preview, index) => {
      const byteCharacters = atob(preview.split(',')[1]);
      const byteArrays = new Uint8Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteArrays[i] = byteCharacters.charCodeAt(i);
      }

      const blob = new Blob([byteArrays], { type: 'image/jpeg' });
      formData.append('imagefile', blob, `image${index + 1}.jpg`);
    });

    console.log('Form Data:');
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    this.catService.updateCat(formData, this.catId).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Cat updated successfully:', response);
        this.toastr.success(cat.name + ' updated successfully', '', {
          timeOut: 3000,
        });
        this.catForm.reset();
        this.imagePreviews = [];
        this.selectedFiles = [];
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error updating cat:', error);
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
