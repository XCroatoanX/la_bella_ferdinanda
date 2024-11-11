import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService
  ) { }

  public onLogout(): void {
    const confirmed = window.confirm('Are you sure you want to log out?');
    if (confirmed) {
      this.authService.logOut();
      this.router.navigate(['/auth/login']);
    }
  }
  public homePage(): void {
    const confirmed = window.confirm('Are you sure you want to go to the home page? You will be logged out');
    if (confirmed) {
      this.authService.logOut();
      this.router.navigate(['/']);
    }
  }

  public showNotification(): void {
    this.toastr.info('This feature is not available yet.', 'Coming soon!', { timeOut: 3000 });
  }
}