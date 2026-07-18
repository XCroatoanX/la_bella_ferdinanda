import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CoreModule } from '../../core/core.module';
import {NgOptimizedImage} from "@angular/common";

@Component({
    selector: 'app-about-breed',
    imports: [CoreModule, NgOptimizedImage],
    templateUrl: './about-breed.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './about-breed.component.scss'
})
export class AboutBreedComponent {
  public CFAhover: boolean = false;
  public TICAhover: boolean = false;
  public MCOhover: boolean = false;
}
