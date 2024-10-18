import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { authGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { CreateCatComponent } from './admin-panel/create-cat/create-cat.component';
import { ContactComponent } from './contact/contact.component';
import { AboutUsComponent } from './about/about-us/about-us.component';
import { AboutBreedComponent } from './about/about-breed/about-breed.component';
import { HowToCareComponent } from './about/how-to-care/how-to-care.component';
import { CreateKittenComponent } from './admin-panel/create-kitten/create-kitten.component';
import { KittensListComponent } from './admin-panel/kittens-list/kittens-list.component';
import { CatsListComponent } from './admin-panel/cats-list/cats-list.component';
import {EditCatComponent} from "./admin-panel/edit-cat/edit-cat.component";
import {EditKittenComponent} from "./admin-panel/edit-kitten/edit-kitten.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  {
    path: 'about',
    children: [
      {
        path: 'about-us',
        component: AboutUsComponent,
      },
      {
        path: 'about-breed',
        component: AboutBreedComponent,
      },
      {
        path: 'how-to-care',
        component: HowToCareComponent,
      },
    ],
  },
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
      { path: 'cats-list', component: CatsListComponent },
      { path: 'create-kitten', component: CreateKittenComponent },
      { path: 'kittens-list', component: KittensListComponent },
      { path: 'edit-cat/:id', component: EditCatComponent },
      { path: 'edit-kitten/:id', component: EditKittenComponent },
    ],
  },
];
