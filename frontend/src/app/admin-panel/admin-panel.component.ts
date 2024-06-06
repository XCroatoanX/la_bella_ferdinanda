import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss',
})
export class AdminPanelComponent {
  constructor(private authService: AuthService, private router: Router) {}

  public onLogout(): void {
    this.authService.logOut();
    this.router.navigate(['/auth/login']);
  }
}
