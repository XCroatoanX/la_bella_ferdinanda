import { Component, OnInit } from '@angular/core';
import { AdminPanelHeaderComponent } from '../admin-panel-header/admin-panel-header.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { KittenService } from '../../services/kitten.service';
import { ToastrService } from 'ngx-toastr';
import { CatKit } from '../../models/catkit.model';

@Component({
  selector: 'app-create-kitten',
  standalone: true,
  imports: [
    AdminPanelHeaderComponent,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './create-kitten.component.html',
  styleUrl: './create-kitten.component.scss',
})
export class CreateKittenComponent implements OnInit {
  public kittenForm: FormGroup;
  public imagePreviews: string[] = [];
  public selectedFiles: File[] = [];
  public isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private kittenService: KittenService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.kittenForm = this.fb.group({
      name: [''],
      color: [''],
      age: [''],
      sex: [''],
      description: [''],
      status: [''],
      litter: [''],
      images: ['', Validators.required],
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

  public submitKitten(): void {
    this.isLoading = true;
    const formData = new FormData();

    const { name, color, age, sex, description, status, litter } = this.kittenForm.value;

    const sexValue: string = sex === '1' ? 'Male' : 'Female';

    let statusValue: string = status === '1' ? 'Available' : status === '2' ? 'Reserved / Under discussion' : status === 3 ? 'Sold' : 'Not for sale';
    const kitten = new CatKit();
    kitten.name = name;
    kitten.color = color;
    kitten.age = age;
    kitten.sex = sexValue as 'Male' | 'Female';
    kitten.article = description;
    kitten.status = statusValue as 'Available' | 'Reserved / Under discussion' | 'Sold' | 'Not for sale';
    kitten.litter = litter;

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
        this.isLoading = false;
        console.log('Cat created successfully:', response);
        this.toastr.success(kitten.name + ' created successfully', '', {
          timeOut: 3000,
        });
        this.kittenForm.reset();
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
