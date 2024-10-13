import { Component, OnInit } from '@angular/core';
import { AdminPanelHeaderComponent } from './admin-panel-header/admin-panel-header.component';
import { CatService } from '../services/cat.service';
import { KittenService } from '../services/kitten.service';
import { Kitten } from '../models/kitten.model';
import { Cat } from '../models/cat.model';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [AdminPanelHeaderComponent],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss',
})
export class AdminPanelComponent implements OnInit {
  public catsNumber: number;
  public kittensNumber: number;
  public kittensList: Array<Kitten>;
  public catsList: Array<Cat>;

  constructor(
    private catService: CatService,
    private kittenService: KittenService,
  ) {}

  ngOnInit(): void {
    this.catService.getAllCats().subscribe((cats: Cat[]) => {
      this.catsNumber = cats.length;
    });
    this.kittenService.getAllKittens().subscribe((kittens: Kitten[]) => {
      this.kittensNumber = kittens.length;
    });
  }
}
