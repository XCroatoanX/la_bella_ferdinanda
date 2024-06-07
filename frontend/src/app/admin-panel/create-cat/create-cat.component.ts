import { Component, OnInit } from '@angular/core';
import { AdminPanelHeaderComponent } from '../admin-panel-header/admin-panel-header.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { CatService } from '../../services/cat.service';
import { Cat } from '../../models/cat.model';

@Component({
  selector: 'app-create-cat',
  standalone: true,
  imports: [AdminPanelHeaderComponent, ReactiveFormsModule, NgClass],
  templateUrl: './create-cat.component.html',
  styleUrl: './create-cat.component.scss',
})
export class CreateCatComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private catService: CatService,
  ) {}

  public catForm: FormGroup;

  ngOnInit(): void {
    this.catForm = this.fb.group({
      name: ['', Validators.required],
      color: ['', Validators.required],
      age: ['', Validators.required],
      weight: ['', Validators.required],
      sex: ['', Validators.required],
      description: ['', Validators.required],
      images: ['', Validators.required],
    });
  }

  public submitCat(): void {
    this.catService.createCat(this.catForm.value).subscribe((cat: Cat) => {
      console.log(cat);
      this.router.navigate(['/admin']);
    });
  }
}
