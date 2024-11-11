import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToCareComponent } from './how-to-care.component';

describe('HowToCareComponent', () => {
  let component: HowToCareComponent;
  let fixture: ComponentFixture<HowToCareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HowToCareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HowToCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
