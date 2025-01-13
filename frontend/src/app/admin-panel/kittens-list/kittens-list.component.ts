import { Component, OnInit } from '@angular/core';
import { AdminPanelHeaderComponent } from '../admin-panel-header/admin-panel-header.component';
import { KittenService } from '../../services/kitten.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CatKit } from '../../models/catkit.model';
import { ItemCardKittenComponent } from "../item-card-kitten/item-card-kitten.component";

@Component({
  selector: 'app-kittens-list',
  imports: [AdminPanelHeaderComponent, CommonModule, ItemCardKittenComponent],
  templateUrl: './kittens-list.component.html',
  styleUrl: './kittens-list.component.scss'
})
export class KittensListComponent implements OnInit {
  kittens: CatKit[] = [];
  loading: boolean = false;

  constructor(private kittenService: KittenService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loading = true;
    this.kittenService.getAllKittensMin().subscribe({
      next: (kittens) => {
        this.kittens = kittens;
        this.loading = false;
      },
      error: (error) => {
        this.toastr.error("Error fetching cats", "Error");
        this.loading = false;
      }
    });
  }
}
