import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KittenPreviewComponent } from './kitten-preview.component';

describe('KittenPreviewComponent', () => {
  let component: KittenPreviewComponent;
  let fixture: ComponentFixture<KittenPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KittenPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KittenPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
