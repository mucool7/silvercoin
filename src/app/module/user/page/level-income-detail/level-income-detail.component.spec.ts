import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelIncomeDetailComponent } from './level-income-detail.component';

describe('LevelIncomeDetailComponent', () => {
  let component: LevelIncomeDetailComponent;
  let fixture: ComponentFixture<LevelIncomeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelIncomeDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelIncomeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
