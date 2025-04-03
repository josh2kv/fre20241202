import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UndoableCounterWithSubjectsComponent } from './undoable-counter-with-subjects.component';

describe('UndoableCounterWithSubjectsComponent', () => {
  let component: UndoableCounterWithSubjectsComponent;
  let fixture: ComponentFixture<UndoableCounterWithSubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UndoableCounterWithSubjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UndoableCounterWithSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
