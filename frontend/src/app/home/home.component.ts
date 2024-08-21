import {Component} from '@angular/core';
import {CoreModule} from '../core/core.module';
import {RouterLink} from '@angular/router';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CoreModule, RouterLink, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
}
