import { Component, OnInit } from '@angular/core';
import { AdminPanelHeaderComponent } from '../admin-panel-header/admin-panel-header.component';
import { KittenService } from '../../services/kitten.service';
import { Kitten } from '../../models/kitten.model';
import { ItemCardComponent } from "../item-card/item-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kittens-list',
  standalone: true,
  imports: [AdminPanelHeaderComponent, ItemCardComponent, CommonModule],
  templateUrl: './kittens-list.component.html',
  styleUrl: './kittens-list.component.scss',
})
export class KittensListComponent implements OnInit {
  kittens: Kitten[] = [];
  constructor(private kittenService: KittenService) { }

  ngOnInit(): void {
    this.kittenService.getAllKittens().subscribe({
      next: (kittens) => {
        console.log("Kittens fetched successfully", kittens);
        this.kittens = kittens;
      },
      error: (error) => {
        console.log("Error fetching cats", error);
      }
    });
  }
}
