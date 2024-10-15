import { Component, Input } from '@angular/core';
import { Cat } from '../../models/cat.model';
import { Kitten } from '../../models/kitten.model';
import { CatService } from '../../services/cat.service';
import { KittenService } from '../../services/kitten.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss'
})
export class ItemCardComponent {
  @Input() animal!: Cat | Kitten;

  constructor(private catService: CatService, private kittenService: KittenService, private toastr: ToastrService) { }

  get isKitten(): boolean {
    return (this.animal as Kitten).bornWeight !== undefined;
  }

  getImageSrc(imageBytes: Uint8Array): string {
    const byteArray = new Uint8Array(imageBytes);
    const base64String = btoa(String.fromCharCode(...byteArray));
    return `data:image/jpeg;base64,${base64String}`;
  }

  deleteAnimal(): void {
    console.log('Animal ID:', this.animal.id);

    const successMessage = this.isKitten ? 'Kitten deleted successfully!' : 'Cat deleted successfully!';
    const errorMessage = this.isKitten ? 'Failed to delete kitten.' : 'Failed to delete cat.';

    const deleteRequest = this.isKitten ?
      this.kittenService.deleteKitten(this.animal.id) :
      this.catService.deleteCat(this.animal.id);

    deleteRequest.subscribe({
      next: () => {
        this.toastr.success(successMessage, 'Success!', { timeOut: 3000 });
        setTimeout(() => {
          window.location.reload();
        }, 3000);

      },
      error: (error) => {
        let message = error.error?.message || 'An unexpected error occurred.';
        this.toastr.error(`${errorMessage} ${message}`, 'Error', { timeOut: 3000 });
        console.error('Error deleting animal:', error);
      }
    });
  }

}
