import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyPinComponent } from './buy-pin.component';

describe('BuyPinComponent', () => {
  let component: BuyPinComponent;
  let fixture: ComponentFixture<BuyPinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyPinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
