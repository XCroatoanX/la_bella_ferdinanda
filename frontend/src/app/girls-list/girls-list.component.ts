import {Component, HostListener, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {CoreModule} from "../core/core.module";
import {CatKit} from "../models/catkit.model";
import {CatService} from "../services/cat.service";
import {ToastrService} from "ngx-toastr";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-girls-list',
  imports: [
    CoreModule,
    RouterLink
  ],
  templateUrl: './girls-list.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './girls-list.component.scss'
})
export class GirlsListComponent implements OnInit {
  girlsList: CatKit[] = [];
  isLoading: boolean = true;
  isMobile: boolean = false;

  constructor(private catService: CatService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.checkScreenSize();
    this.catService.getCatBySexMin("Female").subscribe({
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

  setImageSrc(girl: CatKit): void {
    if (!girl.image || !girl.image.image) {
      console.error('No image data found for the boy:', girl);
      return;
    }

    const imageBase64 = girl.image.image;
    if (imageBase64.startsWith('data:image/')) {
      girl.image.image = imageBase64;
    } else {
      const mimeType = girl.image.type;
      girl.image.image = `data:${mimeType};base64,${imageBase64}`;
    }
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
  }

}
