import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel-header',
  standalone: true,
  imports: [],
  templateUrl: './admin-panel-header.component.html',
  styleUrl: './admin-panel-header.component.scss',
})
export class AdminPanelHeaderComponent {
  constructor(private authService: AuthService, private router: Router) {}

  public onLogout(): void {
    this.authService.logOut();
    this.router.navigate(['/auth/login']);
  }
}
