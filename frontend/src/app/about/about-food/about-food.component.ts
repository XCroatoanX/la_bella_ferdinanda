import { Component } from '@angular/core';
import { CoreModule } from '../../core/core.module';

@Component({
  selector: 'app-about-food',
  standalone: true,
  imports: [CoreModule],
  templateUrl: './about-food.component.html',
  styleUrl: './about-food.component.scss'
})
export class AboutFoodComponent {

}
