import { Component, Input, OnInit } from '@angular/core';
import { CatKit } from '../../models/catkit.model';
import { CatService } from '../../services/cat.service';
import { KittenService } from '../../services/kitten.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent implements OnInit {
  @Input() animal: CatKit;
  public isLoading: boolean = false;
  public imageSrc: string = '';
  public isKitten: boolean;

  constructor(
    private catService: CatService,
    private kittenService: KittenService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    console.log('Component Initialized');
    console.log('Received animal:', this.animal);

    if (this.animal && this.animal.images && this.animal.images.length > 0 && this.animal.images[0].image) {
      const imageData = this.animal.images[0].image;
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
      const mimeType = this.animal.images[0].type;
      this.imageSrc = `data:${mimeType};base64,${imageBase64}`;
    }
  }

  deleteAnimal(): void {
    this.isLoading = true;
    console.log('Delete Animal called. Animal ID:', this.animal.id);

    const successMessage = this.animal.name + ' deleted successfully! Page will soon reload';
    const errorMessage = 'Failed to delete ' + this.animal.name + '.';

    const deleteRequest = this.animal.isKitten
      ? this.kittenService.deleteKitten(this.animal.id)
      : this.catService.deleteCat(this.animal.id);

    deleteRequest.subscribe({
      next: () => {
        console.log('Delete request successful');
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
        console.log('Delete request complete');
        this.isLoading = false;
      },
    });
  }
}
