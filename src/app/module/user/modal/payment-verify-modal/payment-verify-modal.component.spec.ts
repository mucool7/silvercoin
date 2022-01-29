import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentVerifyModalComponent } from './payment-verify-modal.component';

describe('PaymentVerifyModalComponent', () => {
  let component: PaymentVerifyModalComponent;
  let fixture: ComponentFixture<PaymentVerifyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentVerifyModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentVerifyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
