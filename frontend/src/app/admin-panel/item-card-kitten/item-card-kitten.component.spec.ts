import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCardKittenComponent } from './item-card-kitten.component';

describe('ItemCardKittenComponent', () => {
  let component: ItemCardKittenComponent;
  let fixture: ComponentFixture<ItemCardKittenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemCardKittenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemCardKittenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
