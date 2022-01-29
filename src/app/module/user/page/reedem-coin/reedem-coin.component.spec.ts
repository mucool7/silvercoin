import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReedemCoinComponent } from './reedem-coin.component';

describe('ReedemCoinComponent', () => {
  let component: ReedemCoinComponent;
  let fixture: ComponentFixture<ReedemCoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReedemCoinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReedemCoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
