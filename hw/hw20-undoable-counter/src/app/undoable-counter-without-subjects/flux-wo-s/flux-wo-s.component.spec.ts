import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluxWoSComponent } from './flux-wo-s.component';

describe('FluxWoSComponent', () => {
  let component: FluxWoSComponent;
  let fixture: ComponentFixture<FluxWoSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FluxWoSComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FluxWoSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
