import { Component, OnInit } from '@angular/core';
import { AdminPanelHeaderComponent } from '../admin-panel-header/admin-panel-header.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { KittenService } from '../../services/kitten.service';
import { ToastrService } from 'ngx-toastr';
import { Kitten } from '../../models/kitten.model';

@Component({
  selector: 'app-create-kitten',
  standalone: true,
  imports: [
    AdminPanelHeaderComponent,
    ReactiveFormsModule,
    NgClass,
    NgForOf,
    NgIf,
  ],
  templateUrl: './create-kitten.component.html',
  styleUrl: './create-kitten.component.scss',
})
export class CreateKittenComponent implements OnInit {
  public kittenForm: FormGroup;
  public imagePreviews: string[] = [];
  public selectedFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private kittenService: KittenService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.kittenForm = this.fb.group({
      name: ['', Validators.required],
      color: ['', Validators.required],
      age: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      bornWeight: [
        '',
        [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)],
      ],
      weight: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
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

  public submitKitten(): void {
    if (this.kittenForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    const formData = new FormData();

    const { name, color, age, bornWeight, weight, sex, description } =
      this.kittenForm.value;

    const sexValue = sex === '1' ? 'Male' : 'Female';

    const kitten = new Kitten();
    kitten.name = name;
    kitten.color = color;
    kitten.age = age;
    kitten.bornWeight = bornWeight;
    kitten.weight = weight;
    kitten.sex = sexValue as 'Male' | 'Female';
    kitten.article = description;

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

    this.kittenService.createKitten(formData).subscribe({
      next: (response) => {
        console.log('Cat created successfully:', response);
        this.toastr.success(kitten.name + ' created successfully', '', {
          timeOut: 3000,
        });
        this.kittenForm.reset();
        this.imagePreviews = [];
        this.selectedFiles = [];
      },
      error: (error) => {
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
