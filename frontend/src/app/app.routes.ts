import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { authGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'auth/login', component: LoginComponent},
    {path: 'admin', component: AdminPanelComponent, canActivate: [authGuard]}
];
