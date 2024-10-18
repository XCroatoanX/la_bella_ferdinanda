import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditKittenComponent } from './edit-kitten.component';

describe('EditKittenComponent', () => {
  let component: EditKittenComponent;
  let fixture: ComponentFixture<EditKittenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditKittenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditKittenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
