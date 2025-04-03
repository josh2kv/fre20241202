import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanStepComponent } from './plan-step.component';

describe('PlanStepComponent', () => {
  let component: PlanStepComponent;
  let fixture: ComponentFixture<PlanStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
