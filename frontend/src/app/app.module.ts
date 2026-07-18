import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { ToastrModule } from 'ngx-toastr';
import {
  provideHttpClient,
  withInterceptorsFromDi,
  withXhr
} from '@angular/common/http';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ToastrModule.forRoot(),
    // BrowserAnimationsModule,
  ],
  providers: [provideHttpClient(withXhr(), withInterceptorsFromDi())],
  bootstrap: [AppComponent],
})
export class AppModule { }
