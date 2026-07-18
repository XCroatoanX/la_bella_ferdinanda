import { Component, HostListener, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CoreModule } from "../core/core.module";
import { NotificationService } from '../services/notification.service';
import { KittenService } from "../services/kitten.service";
import { RouterLink } from "@angular/router";
import { CatKit } from '../models/catkit.model';

@Component({
  selector: 'app-user-kittens-list',
  imports: [
    CoreModule,
    RouterLink
  ],
  templateUrl: './user-kittens-list.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './user-kittens-list.component.scss'
})
export class UserKittensListComponent implements OnInit {
  kittensList: CatKit[] = [];
  isLoading: boolean = true;
  isMobile: boolean = false;

  constructor(private kittenService: KittenService, private toastr: NotificationService) {
  }

  ngOnInit(): void {
    this.kittenService.getAllKittensMin().subscribe({
      next: (kittens) => {
        this.kittensList = kittens.map(kitten => {
          this.setImageSrc(kitten);
          return kitten;
        });
        this.isLoading = false;
      },
      error: (error) => {
        this.toastr.error("Error fetching kittens", "Error");
        this.isLoading = false;
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  setImageSrc(kitten: CatKit): void {
    if (!kitten.image || !kitten.image.image) {
      console.error('No image data found for the kitten:', kitten);
      return;
    }

    const imageBase64 = kitten.image.image;
    if (imageBase64.startsWith('data:image/')) {
      kitten.image.image = imageBase64;
    } else {
      const mimeType = kitten.image.type;
      kitten.image.image = `data:${mimeType};base64,${imageBase64}`;
    }
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
  }
}
