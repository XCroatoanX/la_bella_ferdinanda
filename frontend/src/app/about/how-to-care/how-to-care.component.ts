import {Component} from '@angular/core';
import {CoreModule} from '../../core/core.module';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-how-to-care',
  imports: [CoreModule, NgOptimizedImage],
  templateUrl: './how-to-care.component.html',
  styleUrl: './how-to-care.component.scss'
})
export class HowToCareComponent {
}
