import { Component, Input, OnInit } from '@angular/core';
import { Cat } from '../../models/cat.model';
import { Kitten } from '../../models/kitten.model';
import { CatService } from '../../services/cat.service';
import { KittenService } from '../../services/kitten.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent implements OnInit {
  @Input() animal!: Cat | Kitten;
  public isLoading: boolean = false;
  public imageSrc: string = '';
  public isKitten: boolean = false;

  constructor(
    private catService: CatService,
    private kittenService: KittenService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  deleteAnimal(): void {
    this.isLoading = true;
    console.log('Animal ID:', this.animal.id);

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
        this.toastr.success(successMessage, 'Success!', { timeOut: 3000 });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      },
      error: (error) => {
        let message = error.error?.message || 'An unexpected error occurred.';
        if (error.status === 404) {
          message = 'Animal not found.';
        }
        this.toastr.error(`${errorMessage} ${message}`, 'Error', { timeOut: 3000 });
        console.error('Error deleting animal:', error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
