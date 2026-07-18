import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AdminPanelHeaderComponent } from '../admin-panel-header/admin-panel-header.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { KittenService } from '../../services/kitten.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { CatKit } from '../../models/catkit.model';
import { handleHttpError } from "../../utils/error-handler";

@Component({
  selector: 'app-edit-kitten',
  imports: [
    AdminPanelHeaderComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './edit-kitten.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
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
    private route: ActivatedRoute,
  ) {
    this.kittenForm = this.fb.group({
      name: [''],
      color: [''],
      age: [''],
      sex: [''],
      description: [''],
      status: [''],
      litter: [''],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.kittenId = params.get('id');
      if (this.kittenId) {
        this.fetchKittenData(this.kittenId);
      }
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

    let statusValue: string = status === '1' ? 'Available' : status === '2' ? 'Reserved / Under discussion' : status === '3' ? 'Sold' : 'Not for sale';

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

    this.imagePreviews.forEach((preview, index) => {
      const byteCharacters = atob(preview.split(',')[1]);
      const byteArrays = new Uint8Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteArrays[i] = byteCharacters.charCodeAt(i);
      }

      const blob = new Blob([byteArrays], { type: 'image/jpeg' });
      formData.append('imagefile', blob, `image${index + 1}.jpg`);
    });


    const kittenId = this.kittenId;
    if (!kittenId) {
      this.isLoading = false;
      return;
    }

    this.kittenService.updateKitten(formData, kittenId).subscribe({
      next: (response) => {
        this.isLoading = false;
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
        handleHttpError(error, this.toastr);
      },
    });
  }

  private fetchKittenData(kittenId: string): void {
    this.kittenService.getKittenById(kittenId).subscribe({
      next: (kitten: CatKit) => {
        this.kittenForm.patchValue({
          name: kitten.name,
          color: kitten.color,
          age: kitten.age,
          sex: kitten.sex === 'Male' ? '1' : '2',
          description: kitten.article,
          status: kitten.status === 'Available' ? '1' : kitten.status === 'Reserved / Under discussion' ? '2' : kitten.status === 'Sold' ? '3' : '4',
          litter: kitten.litter,
        });
        this.imagePreviews = (kitten.images ?? []).map(
          (image) => `data:${image.type};base64,${image.image}`,
        );
      },
      error: (error) => {
        console.error('Error fetching kitten data:', error);
        this.toastr.error(
          'Could not fetch kitten data. Please try again.',
          'Error',
          {
            timeOut: 3000,
          },
        );
      },
    });
  }
}
