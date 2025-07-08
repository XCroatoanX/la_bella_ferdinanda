import {Component, OnInit} from '@angular/core';
import {AdminPanelHeaderComponent} from '../admin-panel-header/admin-panel-header.component';
import {CatService} from '../../services/cat.service';
import {CatKit} from '../../models/catkit.model';
import {ItemCardComponent} from "../item-card/item-card.component";

import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-cats-list',
  imports: [AdminPanelHeaderComponent, ItemCardComponent],
  templateUrl: './cats-list.component.html',
  styleUrl: './cats-list.component.scss'
})
export class CatsListComponent implements OnInit {
  cats: CatKit[] = [];
  loading: boolean = false;

  constructor(private catService: CatService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.loading = true;

    this.catService.getAllCatsMin().subscribe({
      next: (cats) => {
        this.cats = cats;
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.toastr.error("Error fetching cats", "Error");
        this.loading = false;
      }
    });
  }
}
