import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AdminPanelHeaderComponent } from '../admin-panel-header/admin-panel-header.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CatService } from '../../services/cat.service';
import { ToastrService } from 'ngx-toastr';
import { CatKit } from '../../models/catkit.model';
import { CommonModule } from '@angular/common';
import { handleHttpError } from "../../utils/error-handler";

@Component({
  selector: 'app-edit-cat',
  imports: [
    AdminPanelHeaderComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './edit-cat.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./edit-cat.component.scss']
})
export class EditCatComponent implements OnInit {
  public catForm: FormGroup;
  public imagePreviews: { preview: string; mimeType: string, filename: string }[] = [] = [];
  public selectedFiles: File[] = [];
  public isLoading: boolean = false;
  catId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private catService: CatService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
  ) {
    this.catForm = this.fb.group({
      name: [''],
      color: [''],
      age: [''],
      sex: [''],
      description: [''],
      status: [''],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.catId = params.get('id');
      if (this.catId) {
        this.fetchCatData(this.catId);
      }
    });
  }

  public handleFileInput(event: any): void {
    const files: File[] = Array.from(event.target.files);

    this.selectedFiles = [...this.selectedFiles, ...files];

    files.forEach((file) => {
      this.selectedFiles.push(file);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviews.push({
          preview: e.target.result,
          mimeType: file.type,
          filename: file.name,
        });
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

    this.selectedFiles.forEach((file, index) => {
      formData.append('imagefile', file, file.name);
    });

    this.imagePreviews.forEach((imgObj, index) => {
      const byteCharacters = atob(imgObj.preview.split(',')[1]);
      const byteArrays = new Uint8Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteArrays[i] = byteCharacters.charCodeAt(i);
      }

      const ext = imgObj.mimeType.split('/')[1]; // "webp", "jpeg", etc.
      const blob = new Blob([byteArrays], { type: imgObj.mimeType });
      formData.append('imagefile', blob, imgObj.filename);
    });

    const catId = this.catId;
    if (!catId) {
      this.isLoading = false;
      return;
    }

    this.catService.updateCat(formData, catId).subscribe({
      next: (response) => {
        this.isLoading = false;
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
        handleHttpError(error, this.toastr);
      },
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
        this.imagePreviews = (cat.images ?? []).map((image) => ({
          preview: `data:${image.type};base64,${image.image}`,
          mimeType: image.type,
          filename: image.name || `image_${Math.random().toString(36).slice(2)}`,
        }));
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
}
