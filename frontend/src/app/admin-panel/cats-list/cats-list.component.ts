import { Component, OnInit } from '@angular/core';
import { AdminPanelHeaderComponent } from '../admin-panel-header/admin-panel-header.component';
import { CatService } from '../../services/cat.service';
import { Cat } from '../../models/cat.model';
import { ItemCardComponent } from "../item-card/item-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cats-list',
  standalone: true,
  imports: [AdminPanelHeaderComponent, ItemCardComponent, CommonModule],
  templateUrl: './cats-list.component.html',
  styleUrl: './cats-list.component.scss',
})
export class CatsListComponent implements OnInit {
  cats: Cat[] = [];
  constructor(private catService: CatService) { }

  ngOnInit(): void {
    this.catService.getAllCats().subscribe({
      next: (cats) => {
        console.log("Cats fetched successfully", cats);
        this.cats = cats;
      },
      error: (error) => {
        console.log("Error fetching cats", error);
      }
    });
  }
}
