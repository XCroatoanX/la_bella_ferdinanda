import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AdminPanelHeaderComponent } from './admin-panel-header/admin-panel-header.component';
import { CatService } from '../services/cat.service';
import { KittenService } from '../services/kitten.service';
import { CatKit } from '../models/catkit.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  imports: [AdminPanelHeaderComponent, RouterLink],
  templateUrl: './admin-panel.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent implements OnInit {
  public catsNumber: number | undefined;
  public kittensNumber: number | undefined;

  constructor(
    private catService: CatService,
    private kittenService: KittenService,
  ) { }

  ngOnInit(): void {
    this.catService.getAllCatsMin().subscribe((cats: CatKit[]) => {
      this.catsNumber = cats.length;
    });
    this.kittenService.getAllKittensMin().subscribe((kittens: CatKit[]) => {
      this.kittensNumber = kittens.length;
    });
  }
}
