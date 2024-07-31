import { Component } from '@angular/core';
import { CoreModule } from '../core/core.module';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CoreModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  instagramhover: boolean = false;
  facebookhover: boolean = false;
  mailhover: boolean = false;
  phonehover: boolean = false;
  tiktokhover: boolean = false;
}
