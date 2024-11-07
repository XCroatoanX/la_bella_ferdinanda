import {Component, HostListener, OnInit} from '@angular/core';
import {CoreModule} from "../core/core.module";
import {Cat} from "../models/cat.model";
import {CatService} from "../services/cat.service";
import {ToastrService} from "ngx-toastr";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-girls-list',
  standalone: true,
  imports: [
    CoreModule,
    RouterLink
  ],
  templateUrl: './girls-list.component.html',
  styleUrl: './girls-list.component.scss'
})
export class GirlsListComponent implements OnInit{
  girlsList: Cat[] = [];
  isLoading: boolean = true;
  isMobile: boolean = false;

  constructor(private catService: CatService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.checkScreenSize();
    this.catService.getCatBySex("Female").subscribe({
      next: (cats) => {
        this.girlsList = cats.map(girl => {
          this.setImageSrc(girl);
          return girl;
        });
        this.isLoading = false;
      },
      error: (error) => {
        this.toastr.error("Error fetching females", "Error");
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

  setImageSrc(girl: Cat): void {
    if (!girl.images || girl.images.length === 0 || !girl.images[0].image) {
      console.error('No image data found for the boy:', girl);
      return;
    }

    const imageBase64 = girl.images[0].image;
    if (imageBase64.startsWith('data:image/')) {
      girl.images[0].image = imageBase64;
    } else {
      const mimeType = girl.images[0].type;
      girl.images[0].image = `data:${mimeType};base64,${imageBase64}`;
    }
  }

}
