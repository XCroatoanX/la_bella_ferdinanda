import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CoreModule } from '../../core/core.module';

@Component({
    selector: 'app-about-us',
    imports: [CoreModule],
    templateUrl: './about-us.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {}
