import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalHeaderComponent } from './global-header.component';

describe('GlobalHeaderComponent', () => {
  let component: GlobalHeaderComponent;
  let fixture: ComponentFixture<GlobalHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlobalHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
