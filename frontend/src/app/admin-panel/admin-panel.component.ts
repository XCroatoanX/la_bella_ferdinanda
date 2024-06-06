import { Component } from '@angular/core';
import { AdminPanelHeaderComponent } from './admin-panel-header/admin-panel-header.component';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [AdminPanelHeaderComponent],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss',
})
export class AdminPanelComponent {}
