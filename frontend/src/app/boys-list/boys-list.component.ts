import { Component, HostListener, OnInit } from '@angular/core';
import { CoreModule } from "../core/core.module";
import { CatKit } from "../models/catkit.model";
import { CatService } from "../services/cat.service";
import { ToastrService } from "ngx-toastr";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-boys-list',
    imports: [
        CoreModule,
        RouterLink
    ],
    templateUrl: './boys-list.component.html',
    styleUrls: ['./boys-list.component.scss']
})
export class BoysListComponent implements OnInit {
  boysList: CatKit[] = [];
  isLoading: boolean = true;
  isMobile: boolean = false;

  constructor(private catService: CatService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.checkScreenSize();
    this.catService.getCatBySexMin("Male").subscribe({
      next: (cats) => {
        this.boysList = cats.map(boy => {
          this.setImageSrc(boy);
          return boy;
        });
        this.isLoading = false;
      },
      error: (error) => {
        this.toastr.error("Error fetching males", "Error");
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

  setImageSrc(boy: CatKit): void {
    if (!boy.image || !boy.image.image) {
      console.error('No image data found for the male:', boy);
      return;
    }

    const imageBase64 = boy.image.image;
    if (imageBase64.startsWith('data:image/')) {
      boy.image.image = imageBase64;
    } else {
      const mimeType = boy.image.type;
      boy.image.image = `data:${mimeType};base64,${imageBase64}`;
    }
  }
}
