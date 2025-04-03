import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UndoableCounterWithoutSubjectComponent } from './undoable-counter-without-subject.component';

describe('UndoableCounterWithoutSubjectComponent', () => {
  let component: UndoableCounterWithoutSubjectComponent;
  let fixture: ComponentFixture<UndoableCounterWithoutSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UndoableCounterWithoutSubjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UndoableCounterWithoutSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
