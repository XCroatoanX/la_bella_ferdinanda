import {Component, ChangeDetectionStrategy} from '@angular/core';
import {CoreModule} from "../core/core.module";
import {KittenService} from "../services/kitten.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";
import {CatKit} from '../models/catkit.model';

@Component({
  selector: 'app-kitten-preview',
  imports: [
    CoreModule,
  ],
  templateUrl: './kitten-preview.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './kitten-preview.component.scss'
})
export class KittenPreviewComponent {
  kittenId: string | null = null;
  kitten: CatKit | null = null;
  isLoading: boolean = true;

  constructor(
    private kittenService: KittenService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.kittenId = params.get('id');
      if (this.kittenId) {
        this.kittenService.getKittenById(this.kittenId).subscribe({
          next: (kitten) => {
            this.kitten = kitten;
            this.isLoading = false;
          },
          error: (error) => {
            this.toastr.error("Error fetching kitten details", "Error");
            this.isLoading = false;
          }
        });
      }
    });
  }

  getImageSrc(image: { image: any; type: any; }): string {
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
