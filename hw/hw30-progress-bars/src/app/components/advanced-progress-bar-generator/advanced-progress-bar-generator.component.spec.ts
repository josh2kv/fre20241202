import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedProgressBarGeneratorComponent } from './advanced-progress-bar-generator.component';

describe('AdvancedProgressBarGeneratorComponent', () => {
  let component: AdvancedProgressBarGeneratorComponent;
  let fixture: ComponentFixture<AdvancedProgressBarGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvancedProgressBarGeneratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvancedProgressBarGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
