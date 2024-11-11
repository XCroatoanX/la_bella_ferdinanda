import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCatsListComponent } from './user-cats-list.component';

describe('UserCatsListComponent', () => {
  let component: UserCatsListComponent;
  let fixture: ComponentFixture<UserCatsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCatsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCatsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
