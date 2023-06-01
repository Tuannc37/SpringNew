import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListManageCartComponent } from './list-manage-cart.component';

describe('ListManageCartComponent', () => {
  let component: ListManageCartComponent;
  let fixture: ComponentFixture<ListManageCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListManageCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListManageCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
