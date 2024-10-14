import { Component } from '@angular/core';
import { AdminPanelHeaderComponent } from '../admin-panel-header/admin-panel-header.component';

@Component({
  selector: 'app-kittens-list',
  standalone: true,
  imports: [AdminPanelHeaderComponent],
  templateUrl: './kittens-list.component.html',
  styleUrl: './kittens-list.component.scss',
})
export class KittensListComponent {}
