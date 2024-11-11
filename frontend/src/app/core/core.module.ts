import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [NgOptimizedImage, RouterModule],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
