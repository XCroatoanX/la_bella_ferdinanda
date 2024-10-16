import { Component, OnInit } from '@angular/core';
import { AdminPanelHeaderComponent } from '../admin-panel-header/admin-panel-header.component';
import { CatService } from '../../services/cat.service';
import { Cat } from '../../models/cat.model';
import { ItemCardComponent } from "../item-card/item-card.component";
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cats-list',
  standalone: true,
  imports: [AdminPanelHeaderComponent, ItemCardComponent, CommonModule],
  templateUrl: './cats-list.component.html',
  styleUrl: './cats-list.component.scss',
})
export class CatsListComponent implements OnInit {
  cats: Cat[] = [];
  loading: boolean = false;

  constructor(private catService: CatService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loading = true;

    this.catService.getAllCats().subscribe({
      next: (cats) => {
        this.cats = cats;
        this.loading = false;
      },
      error: (error) => {
        this.toastr.error("Error fetching cats", "Error");
        this.loading = false;
      }
    });
  }
}
