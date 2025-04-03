import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialsStepComponent } from './credentials-step.component';

describe('CredentialsStepComponent', () => {
  let component: CredentialsStepComponent;
  let fixture: ComponentFixture<CredentialsStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CredentialsStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CredentialsStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
