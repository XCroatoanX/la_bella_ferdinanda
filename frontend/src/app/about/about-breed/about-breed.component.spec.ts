import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutBreedComponent } from './about-breed.component';

describe('AboutBreedComponent', () => {
  let component: AboutBreedComponent;
  let fixture: ComponentFixture<AboutBreedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutBreedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutBreedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
