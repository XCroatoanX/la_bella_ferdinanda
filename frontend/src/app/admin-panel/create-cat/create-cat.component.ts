import { Component, OnInit } from '@angular/core';
import { AdminPanelHeaderComponent } from '../admin-panel-header/admin-panel-header.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { CatService } from '../../services/cat.service';
import { ToastrService } from 'ngx-toastr';
import { Cat } from '../../models/cat.model';

@Component({
  selector: 'app-create-cat',
  standalone: true,
  imports: [
    AdminPanelHeaderComponent,
    ReactiveFormsModule,
    NgClass,
    CommonModule,
  ],
  templateUrl: './create-cat.component.html',
  styleUrls: ['./create-cat.component.scss'],
})
export class CreateCatComponent implements OnInit {
  public catForm: FormGroup;
  public imagePreviews: string[] = [];
  public selectedFiles: File[] = [];
  public isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private catService: CatService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
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

  public handleFileInput(event: any): void {
    const files: File[] = Array.from(event.target.files);
    this.selectedFiles = files;
    this.imagePreviews = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviews.push(e.target.result);
      };
      reader.readAsDataURL(file);
    });
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

    this.catService.createCat(formData).subscribe({
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
