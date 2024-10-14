import { Component } from '@angular/core';
import { AdminPanelHeaderComponent } from '../admin-panel-header/admin-panel-header.component';

@Component({
  selector: 'app-cats-list',
  standalone: true,
  imports: [AdminPanelHeaderComponent],
  templateUrl: './cats-list.component.html',
  styleUrl: './cats-list.component.scss',
})
export class CatsListComponent {}
