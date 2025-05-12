import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressBarGeneratorComponent } from './progress-bar-generator.component';

describe('ProgressBarGeneratorComponent', () => {
  let component: ProgressBarGeneratorComponent;
  let fixture: ComponentFixture<ProgressBarGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressBarGeneratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressBarGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
