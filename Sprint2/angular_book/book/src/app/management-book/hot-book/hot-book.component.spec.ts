import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotBookComponent } from './hot-book.component';

describe('HotBookComponent', () => {
  let component: HotBookComponent;
  let fixture: ComponentFixture<HotBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
