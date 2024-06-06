import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { authGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { CreateCatComponent } from './admin-panel/create-cat/create-cat.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth/login', component: LoginComponent },
  {
    path: 'admin',
    canActivate: [authGuard],
    children: [
      { path: '', component: AdminPanelComponent },
      {
        path: 'create-cat',
        component: CreateCatComponent,
      },
    ],
  },
];
