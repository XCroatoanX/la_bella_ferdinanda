import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KittensListComponent } from './kittens-list.component';

describe('KittensListComponent', () => {
  let component: KittensListComponent;
  let fixture: ComponentFixture<KittensListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KittensListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KittensListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
