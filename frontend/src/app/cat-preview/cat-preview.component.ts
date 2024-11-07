import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { CatService } from "../services/cat.service";
import { Cat } from "../models/cat.model";
import {CommonModule} from "@angular/common";
import {CoreModule} from "../core/core.module";

@Component({
  selector: 'app-cat-preview',
  standalone: true,
  imports: [
    CommonModule,
    CoreModule
  ],
  templateUrl: './cat-preview.component.html',
  styleUrls: ['./cat-preview.component.scss']
})
export class CatPreviewComponent implements OnInit {
  catId: string | null = null;
  cat: Cat | null = null;
  isLoading: boolean = true;

  constructor(
    private catService: CatService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.catId = params.get('id');
      if (this.catId) {
        this.catService.getCatById(this.catId).subscribe({
          next: (cat) => {
            this.cat = cat;
            this.isLoading = false;
          },
          error: (error) => {
            this.toastr.error("Error fetching cat details", "Error");
            this.isLoading = false;
          }
        });
      }
    });
  }

  getImageSrc(image): string {
    const imageBase64 = image.image;
    const mimeType = image.type;

    if (!imageBase64) {
      console.error('Image data is undefined or null');
      return '';
    }

    if (imageBase64.startsWith('data:image/')) {
      return imageBase64;
    } else {
      return `data:${mimeType};base64,${imageBase64}`;
    }
  }
}
