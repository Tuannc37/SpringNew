import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreatComponent } from './user-creat.component';

describe('UserCreatComponent', () => {
  let component: UserCreatComponent;
  let fixture: ComponentFixture<UserCreatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCreatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
