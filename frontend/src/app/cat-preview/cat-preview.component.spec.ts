import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatPreviewComponent } from './cat-preview.component';

describe('CatPreviewComponent', () => {
  let component: CatPreviewComponent;
  let fixture: ComponentFixture<CatPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
