import { Component, HostListener, OnInit } from '@angular/core';
import { CoreModule } from "../core/core.module";
import { RouterLink } from "@angular/router";
import { CatKit } from "../models/catkit.model";
import { CatService } from "../services/cat.service";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: 'app-user-cats-list',
    imports: [
        CoreModule,
        RouterLink
    ],
    templateUrl: './user-cats-list.component.html',
    styleUrl: './user-cats-list.component.scss'
})
export class UserCatsListComponent implements OnInit {
  catsList: CatKit[] = [];
  isLoading: boolean = true;
  isMobile: boolean = false;

  constructor(private catService: CatService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.catService.getAllCatsMin().subscribe({
      next: (cats) => {
        this.catsList = cats.map(cat => {
          this.setImageSrc(cat);
          return cat;
        });
        this.isLoading = false;
      },
      error: (error) => {
        this.toastr.error("Error fetching cats", "Error");
        this.isLoading = false;
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
  }

  setImageSrc(cat: CatKit): void {
    if (!cat.images || cat.images.length === 0 || !cat.images[0].image) {
      console.error('No image data found for the cat:', cat);
      return;
    }

    const imageBase64 = cat.images[0].image;
    if (imageBase64.startsWith('data:image/')) {
      cat.images[0].image = imageBase64;
    } else {
      const mimeType = cat.images[0].type;
      cat.images[0].image = `data:${mimeType};base64,${imageBase64}`;
    }
  }
}
