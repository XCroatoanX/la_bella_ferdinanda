import {Component, HostListener, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {CoreModule} from '../core/core.module';
import {RouterLink} from '@angular/router';
import {NgOptimizedImage} from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CoreModule, RouterLink, NgOptimizedImage],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public isMobile: boolean = false;

  ngOnInit(): void {
    this.checkAnimationPlaying();
    this.isMobile = window.innerWidth <= 768;
    window.addEventListener('resize', this.onResize.bind(this));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  public checkAnimationPlaying(): void {
    if (!sessionStorage.getItem('hasVisited')) {

      document.body.classList.add('preloading');
      sessionStorage.setItem('hasVisited', 'true');

      window.addEventListener('load', () => {
        setTimeout(() => {
          document.body.classList.remove('preloading');
          document.getElementById('preloader')?.remove();
        }, 4000);
      });
    } else {

      document.getElementById('preloader')?.remove();
    }

  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
  }
}
