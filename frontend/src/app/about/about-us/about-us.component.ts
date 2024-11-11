import { Component } from '@angular/core';
import { CoreModule } from '../../core/core.module';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CoreModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
})
export class AboutUsComponent {}
