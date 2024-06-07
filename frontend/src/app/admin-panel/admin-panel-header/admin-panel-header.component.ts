import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-admin-panel-header',
  standalone: true,
  imports: [NgOptimizedImage, RouterModule],
  templateUrl: './admin-panel-header.component.html',
  styleUrl: './admin-panel-header.component.scss',
})
export class AdminPanelHeaderComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  public onLogout(): void {
    this.authService.logOut();
    this.router.navigate(['/auth/login']);
  }
}
