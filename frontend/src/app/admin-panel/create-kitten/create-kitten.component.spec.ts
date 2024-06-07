import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateKittenComponent } from './create-kitten.component';

describe('CreateKittenComponent', () => {
  let component: CreateKittenComponent;
  let fixture: ComponentFixture<CreateKittenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateKittenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateKittenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
