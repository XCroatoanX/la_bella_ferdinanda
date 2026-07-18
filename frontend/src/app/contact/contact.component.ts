import {Component, ChangeDetectionStrategy} from '@angular/core';
import {CoreModule} from '../core/core.module';

@Component({
  selector: 'app-contact',
  imports: [CoreModule],
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  instagramhover: boolean = false;
  facebookhover: boolean = false;
  mailhover: boolean = false;
  phonehover: boolean = false;
  tiktokhover: boolean = false;
}
