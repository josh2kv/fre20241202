import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedProgressBarComponent } from './advanced-progress-bar.component';

describe('AdvancedProgressBarComponent', () => {
  let component: AdvancedProgressBarComponent;
  let fixture: ComponentFixture<AdvancedProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvancedProgressBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvancedProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
