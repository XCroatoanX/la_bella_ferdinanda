import { Component } from '@angular/core';
import { CoreModule } from '../../core/core.module';

@Component({
  selector: 'app-about-breed',
  standalone: true,
  imports: [CoreModule],
  templateUrl: './about-breed.component.html',
  styleUrl: './about-breed.component.scss',
})
export class AboutBreedComponent {
  public CFAhover: boolean = false;
  public TICAhover: boolean = false;
  public MCOhover: boolean = false;
}
