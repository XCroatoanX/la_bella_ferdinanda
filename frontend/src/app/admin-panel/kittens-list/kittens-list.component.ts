import { Component, OnInit } from '@angular/core';
import { AdminPanelHeaderComponent } from '../admin-panel-header/admin-panel-header.component';
import { KittenService } from '../../services/kitten.service';
import { Kitten } from '../../models/kitten.model';
import { ItemCardComponent } from "../item-card/item-card.component";
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-kittens-list',
  standalone: true,
  imports: [AdminPanelHeaderComponent, ItemCardComponent, CommonModule],
  templateUrl: './kittens-list.component.html',
  styleUrl: './kittens-list.component.scss',
})
export class KittensListComponent implements OnInit {
  kittens: Kitten[] = [];
  loading: boolean = false;

  constructor(private kittenService: KittenService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loading = true;
    this.kittenService.getAllKittens().subscribe({
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
