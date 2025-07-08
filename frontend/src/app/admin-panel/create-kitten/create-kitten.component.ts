import {Component, OnInit} from '@angular/core';
import {AdminPanelHeaderComponent} from '../admin-panel-header/admin-panel-header.component';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
import {NgClass} from '@angular/common';
import {Router} from '@angular/router';
import {KittenService} from '../../services/kitten.service';
import {ToastrService} from 'ngx-toastr';
import {CatKit} from '../../models/catkit.model';
import {handleCatKitError} from "../../utils/error-handler";

@Component({
  selector: 'app-create-kitten',
  imports: [
    AdminPanelHeaderComponent,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './create-kitten.component.html',
  styleUrl: './create-kitten.component.scss'
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
  ) {
  }

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

    const {name, color, age, sex, description, status, litter} = this.kittenForm.value;

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
      new Blob([JSON.stringify(kitten)], {type: 'application/json'}),
    );

    this.selectedFiles.forEach((file) => {
      formData.append('imagefile', file, file.name);
    });

    this.kittenService.createKitten(formData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.toastr.success(kitten.name + ' created successfully', '', {
          timeOut: 3000,
        });
        this.kittenForm.reset();
        this.imagePreviews = [];
        this.selectedFiles = [];
      },
      error: (error) => handleCatKitError(error),
    });
  }
}
