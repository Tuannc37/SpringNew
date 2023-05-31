import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBookSaleComponent } from './list-book-sale.component';

describe('ListBookSaleComponent', () => {
  let component: ListBookSaleComponent;
  let fixture: ComponentFixture<ListBookSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBookSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBookSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
