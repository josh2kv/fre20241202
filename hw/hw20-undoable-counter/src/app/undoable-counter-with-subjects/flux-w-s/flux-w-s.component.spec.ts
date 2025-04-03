import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluxWSComponent } from './flux-w-s.component';

describe('FluxWSComponent', () => {
  let component: FluxWSComponent;
  let fixture: ComponentFixture<FluxWSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FluxWSComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FluxWSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
