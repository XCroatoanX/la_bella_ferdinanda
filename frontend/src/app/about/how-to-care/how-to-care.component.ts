import { Component } from '@angular/core';
import { CoreModule } from '../../core/core.module';

@Component({
  selector: 'app-how-to-care',
  standalone: true,
  imports: [CoreModule],
  templateUrl: './how-to-care.component.html',
  styleUrl: './how-to-care.component.scss',
})
export class HowToCareComponent {}
