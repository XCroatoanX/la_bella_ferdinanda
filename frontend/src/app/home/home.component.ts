import { Component, HostListener, OnInit } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CoreModule, RouterLink, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
    public isMobile: boolean = false;
    ngOnInit(): void {
        this.isMobile = window.innerWidth <= 768;
        window.addEventListener('resize', this.onResize.bind(this));
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.checkScreenSize();
    }

    private checkScreenSize() {
        this.isMobile = window.innerWidth <= 768;
    }
}
