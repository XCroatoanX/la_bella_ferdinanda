import {Component, HostListener, OnInit} from '@angular/core';
import {CoreModule} from "../core/core.module";
import {Cat} from "../models/cat.model";
import {CatService} from "../services/cat.service";
import {ToastrService} from "ngx-toastr";
import {KittenService} from "../services/kitten.service";
import {RouterLink} from "@angular/router";
import {Kitten} from "../models/kitten.model";

@Component({
  selector: 'app-user-kittens-list',
  standalone: true,
  imports: [
    CoreModule,
    RouterLink
  ],
  templateUrl: './user-kittens-list.component.html',
  styleUrl: './user-kittens-list.component.scss'
})
export class UserKittensListComponent implements OnInit{
  kittensList: Kitten[] = [];
  isLoading: boolean = true;
  isMobile: boolean = false;

  constructor(private kittenService: KittenService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.kittenService.getAllKittens().subscribe({
      next: (cats) => {
        this.kittensList = cats.map(kitten => {
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

  private checkScreenSize() {
    this.isMobile = window.innerWidth <= 768; // Adjust the value as needed
  }

  setImageSrc(kitten: Kitten): void {
    if (!kitten.images || kitten.images.length === 0 || !kitten.images[0].image) {
      console.error('No image data found for the kitten:', kitten);
      return;
    }

    const imageBase64 = kitten.images[0].image;
    if (imageBase64.startsWith('data:image/')) {
      kitten.images[0].image = imageBase64;
    } else {
      const mimeType = kitten.images[0].type;
      kitten.images[0].image = `data:${mimeType};base64,${imageBase64}`;
    }
  }
}
