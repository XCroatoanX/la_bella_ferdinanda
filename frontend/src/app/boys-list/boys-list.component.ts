import {Component, HostListener, OnInit} from '@angular/core';
import { CoreModule } from "../core/core.module";
import { Cat } from "../models/cat.model";
import { CatService } from "../services/cat.service";
import { ToastrService } from "ngx-toastr";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-boys-list',
  standalone: true,
  imports: [
    CoreModule,
    RouterLink
  ],
  templateUrl: './boys-list.component.html',
  styleUrls: ['./boys-list.component.scss']
})
export class BoysListComponent implements OnInit {
  boysList: Cat[] = [];
  isLoading: boolean = true;
  isMobile: boolean = false;

  constructor(private catService: CatService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.checkScreenSize();
    this.catService.getCatBySex("Male").subscribe({
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
    this.isMobile = window.innerWidth <= 768; // Adjust the value as needed
  }

  setImageSrc(boy: Cat): void {
    if (!boy.images || boy.images.length === 0 || !boy.images[0].image) {
      console.error('No image data found for the male:', boy);
      return;
    }

    const imageBase64 = boy.images[0].image;
    if (imageBase64.startsWith('data:image/')) {
      boy.images[0].image = imageBase64;
    } else {
      const mimeType = boy.images[0].type;
      boy.images[0].image = `data:${mimeType};base64,${imageBase64}`;
    }
  }
}
