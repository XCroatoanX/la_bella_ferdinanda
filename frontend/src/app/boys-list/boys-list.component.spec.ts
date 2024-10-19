import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoysListComponent } from './boys-list.component';

describe('BoysListComponent', () => {
  let component: BoysListComponent;
  let fixture: ComponentFixture<BoysListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoysListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoysListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
