import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UndoableCounterWithoutSubjectsComponent } from './undoable-counter-without-subjects.component';

describe('UndoableCounterWithoutSubjectsComponent', () => {
  let component: UndoableCounterWithoutSubjectsComponent;
  let fixture: ComponentFixture<UndoableCounterWithoutSubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UndoableCounterWithoutSubjectsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UndoableCounterWithoutSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
