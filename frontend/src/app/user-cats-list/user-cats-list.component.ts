import {Component, HostListener, OnInit} from '@angular/core';
import {CoreModule} from "../core/core.module";
import {RouterLink} from "@angular/router";
import {CatKit} from "../models/catkit.model";
import {CatService} from "../services/cat.service";
import {ToastrService} from "ngx-toastr";

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

  constructor(private catService: CatService, private toastr: ToastrService) {
  }

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

  setImageSrc(cat: CatKit): void {
    if (!cat.image || !cat.image.image) {
      console.error('No image data found for the cat:', cat);
      return;
    }

    const imageBase64 = cat.image.image;
    if (imageBase64.startsWith('data:image/')) {
      cat.image.image = imageBase64;
    } else {
      const mimeType = cat.image.type;
      cat.image.image = `data:${mimeType};base64,${imageBase64}`;
    }
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
  }
}
