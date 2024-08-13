import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutFoodComponent } from './about-food.component';

describe('AboutFoodComponent', () => {
  let component: AboutFoodComponent;
  let fixture: ComponentFixture<AboutFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutFoodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
