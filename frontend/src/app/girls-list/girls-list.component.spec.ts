import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GirlsListComponent } from './girls-list.component';

describe('GirlsListComponent', () => {
  let component: GirlsListComponent;
  let fixture: ComponentFixture<GirlsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GirlsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GirlsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
