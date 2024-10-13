import { Component, OnInit } from '@angular/core';
import { AdminPanelHeaderComponent } from '../admin-panel-header/admin-panel-header.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgClass, CommonModule } from '@angular/common'; // Import CommonModule
import { CatService } from '../../services/cat.service';
import { Cat } from '../../models/cat.model';

@Component({
  selector: 'app-create-cat',
  standalone: true,
  imports: [AdminPanelHeaderComponent, ReactiveFormsModule, NgClass, CommonModule], // Add CommonModule here
  templateUrl: './create-cat.component.html',
  styleUrls: ['./create-cat.component.scss'], // Fixed styleUrl to styleUrls
})
export class CreateCatComponent implements OnInit {
  public catForm: FormGroup;
  public imagePreviews: string[] = [];
  public selectedFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private catService: CatService,
  ) { }

  ngOnInit(): void {
    this.catForm = this.fb.group({
      name: ['', Validators.required],
      color: ['', Validators.required],
      age: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      weight: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
      sex: ['', Validators.required],
      description: ['', Validators.required],
      images: ['', Validators.required],
    });
  }

  public handleFileInput(event: any): void {
    const files: File[] = Array.from(event.target.files);
    this.selectedFiles = files; // Store the selected files
    this.imagePreviews = []; // Reset image previews

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviews.push(e.target.result);
      };
      reader.readAsDataURL(file);
    });
  }

  public submitCat(): void {
    if (this.catForm.invalid) {
      console.error('Form is invalid');
      return; // Prevent submission if the form is invalid
    }

    const formData = new FormData();

    // Destructure form values
    const { name, color, age, weight, sex, description } = this.catForm.value;

    // Convert the numeric value (1 or 2) to the appropriate string (male or female)
    const sexValue = sex === '1' ? 'male' : 'female';

    // Prepare the cat object
    const cat = {
      name,
      color,
      age,
      weight,
      sex: sexValue, // Use the converted value here
      article: description
    };

    // Append the cat JSON to FormData
    formData.append('cat', JSON.stringify(cat));

    // Append image files
    this.selectedFiles.forEach((file) => {
      formData.append('imagefile', file, file.name);
    });

    console.log('Form Data:');
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    // Send the form data via service with custom headers
    this.catService.createCat(formData).subscribe(
      (response) => {
        console.log(response);
        // Optionally navigate or show a success message here
        this.router.navigate(['/cats']); // Navigate to the cats list after submission
      },
      (error) => {
        console.error('Error creating cat:', error);
      }
    );
  }
}
