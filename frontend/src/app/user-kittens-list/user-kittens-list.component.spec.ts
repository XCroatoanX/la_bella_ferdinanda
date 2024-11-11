import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserKittensListComponent } from './user-kittens-list.component';

describe('UserKittensListComponent', () => {
  let component: UserKittensListComponent;
  let fixture: ComponentFixture<UserKittensListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserKittensListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserKittensListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
