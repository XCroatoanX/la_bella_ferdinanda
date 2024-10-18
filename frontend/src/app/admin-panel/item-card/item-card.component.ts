import { Component, Input, OnInit } from '@angular/core';
import { Cat } from '../../models/cat.model';
import { Kitten } from '../../models/kitten.model';
import { CatService } from '../../services/cat.service';
import { KittenService } from '../../services/kitten.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent implements OnInit {
  @Input() animal!: Cat | Kitten;  // Input animal
  public isLoading: boolean = false;
  public imageSrc: string = '';    // Holds the image Blob URL
  public isKitten: boolean = false;

  constructor(
    private catService: CatService,
    private kittenService: KittenService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    console.log('Component Initialized');  // Log component initialization
    console.log('Received animal:', this.animal);  // Log the input animal object

    // Check if the animal is a kitten based on the presence of bornWeight
    this.isKitten = (this.animal as Kitten).bornWeight !== undefined;

    if (this.animal && this.animal.images && this.animal.images.length > 0 && this.animal.images[0].image) {
      const imageData = this.animal.images[0].image;
      this.setImageSrc(imageData);
    } else {
      console.error('No image data found for the animal');  // Log missing image data
    }
  }

  setImageSrc(imageBase64: string): void {
    if (!imageBase64) {
      console.error('Image data is undefined or null');  // Log missing imageBase64
      return;
    }

    // Check if imageBase64 is already a full Data URL
    if (imageBase64.startsWith('data:image/')) {
      this.imageSrc = imageBase64; // Use it as is
    } else {
      // If it's not a full Data URL, construct one with the correct type
      const mimeType = this.animal.images[0].type; // Get MIME type from the image model
      this.imageSrc = `data:${mimeType};base64,${imageBase64}`;
    }
  }

  deleteAnimal(): void {
    this.isLoading = true;
    console.log('Delete Animal called. Animal ID:', this.animal.id);

    const successMessage = this.isKitten
      ? 'Kitten deleted successfully! Page will soon reload'
      : 'Cat deleted successfully! Page will soon reload';
    const errorMessage = this.isKitten
      ? 'Failed to delete kitten.'
      : 'Failed to delete cat.';

    const deleteRequest = this.isKitten
      ? this.kittenService.deleteKitten(this.animal.id)
      : this.catService.deleteCat(this.animal.id);

    deleteRequest.subscribe({
      next: () => {
        console.log('Delete request successful');  // Log success
        this.toastr.success(successMessage, 'Success!', { timeOut: 3000 });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      },
      error: (error) => {
        console.error('Delete request error:', error);  // Log the error
        let message = error.error?.message || 'An unexpected error occurred.';
        if (error.status === 404) {
          message = 'Animal not found.';
          console.error('Animal not found (404)');  // Log 404 specific error
        }
        this.toastr.error(`${errorMessage} ${message}`, 'Error', { timeOut: 3000 });
      },
      complete: () => {
        console.log('Delete request complete');  // Log request completion
        this.isLoading = false;
      },
    });
  }
}
