import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CatKit } from "../../models/catkit.model";
import { CatService } from "../../services/cat.service";
import { KittenService } from "../../services/kitten.service";
import { NotificationService } from '../../services/notification.service';
import { RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-item-card-kitten',
  imports: [
    CommonModule, RouterLink
  ],
  templateUrl: './item-card-kitten.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './item-card-kitten.component.scss'
})
export class ItemCardKittenComponent implements OnInit {
  @Input({ required: true }) animal!: CatKit;
  public isLoading: boolean = false;
  public imageSrc: string = '';

  constructor(
    private catService: CatService,
    private kittenService: KittenService,
    private toastr: NotificationService,
  ) {
  }

  ngOnInit(): void {
    if (this.animal && this.animal.image && this.animal.image.image) {
      const imageData = this.animal.image.image;
      this.setImageSrc(imageData);
    } else {
      console.error('No image data found for the animal');
    }
  }

  setImageSrc(imageBase64: string): void {
    if (!imageBase64) {
      console.error('Image data is undefined or null');
      return;
    }

    if (imageBase64.startsWith('data:image/')) {
      this.imageSrc = imageBase64;
    } else {
      const mimeType = this.animal.image?.type ?? 'image/jpeg';
      this.imageSrc = `data:${mimeType};base64,${imageBase64}`;
    }
  }

  deleteAnimal(): void {
    this.isLoading = true;

    const successMessage = this.animal.name + ' deleted successfully! Page will soon reload';
    const errorMessage = 'Failed to delete ' + this.animal.name + '.';

    const deleteRequest = this.animal.isKitten
      ? this.kittenService.deleteKitten(this.animal.id)
      : this.catService.deleteCat(this.animal.id);

    deleteRequest.subscribe({
      next: () => {
        this.toastr.success(successMessage, 'Success!', { timeOut: 3000 });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      },
      error: (error) => {
        console.error('Delete request error:', error);
        let message = error.error?.message || 'An unexpected error occurred.';
        if (error.status === 404) {
          message = 'Animal not found.';
          console.error('Animal not found (404)');
        }
        this.toastr.error(`${errorMessage} ${message}`, 'Error', {
          timeOut: 3000,
        });
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
