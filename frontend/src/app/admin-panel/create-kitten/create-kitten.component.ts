import { Component, OnInit } from '@angular/core';
import { AdminPanelHeaderComponent } from '../admin-panel-header/admin-panel-header.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { KittenService } from '../../services/kitten.service';

@Component({
  selector: 'app-create-kitten',
  standalone: true,
  imports: [AdminPanelHeaderComponent, ReactiveFormsModule, NgClass],
  templateUrl: './create-kitten.component.html',
  styleUrl: './create-kitten.component.scss'
})
export class CreateKittenComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private kittenService: KittenService,
  ) { }

  public kittenForm: FormGroup;

  ngOnInit(): void {
    this.kittenForm = this.fb.group({
      name: ['', Validators.required],
      color: ['', Validators.required],
      age: ['', Validators.required],
      bornWeight: ["", Validators.required],
      weight: ['', Validators.required],
      sex: ['', Validators.required],
      description: ['', Validators.required],
      images: ['', Validators.required],
    });
  }

  public submitKitten(): void {
    console.log("submit kitten");
  }
}
