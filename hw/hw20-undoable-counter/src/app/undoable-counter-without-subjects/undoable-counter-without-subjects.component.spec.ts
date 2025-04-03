import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
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

  it('should initialize with count 0', () => {
    expect(component.currentCount).toBe(0);
    expect(component.countHistory).toEqual([0]);
  });

  describe('Counter Operations', () => {
    it('should add 1, 10, and 100 correctly', () => {
      component.pushCount(1, 'add');
      expect(component.currentCount).toBe(1);

      component.pushCount(10, 'add');
      expect(component.currentCount).toBe(11);

      component.pushCount(100, 'add');
      expect(component.currentCount).toBe(111);
    });

    it('should subtract 1, 10, and 100 correctly', () => {
      component.pushCount(100, 'add'); // Start at 100
      expect(component.currentCount).toBe(100);

      component.pushCount(1, 'sub');
      expect(component.currentCount).toBe(99);

      component.pushCount(10, 'sub');
      expect(component.currentCount).toBe(89);

      component.pushCount(100, 'sub');
      expect(component.currentCount).toBe(-11);
    });
  });

  describe('History Management', () => {
    it('should maintain history of operations', () => {
      component.pushCount(10, 'add');
      component.pushCount(5, 'sub');
      expect(component.countHistory).toEqual([0, 10, 5]);
    });

    it('should limit history to MAX_LENGTH entries', () => {
      for (let i = 0; i < component.MAX_LENGTH + 5; i++) {
        component.pushCount(1, 'add');
      }
      expect(component.countHistory.length).toBe(component.MAX_LENGTH);
    });
  });

  describe('Undo/Redo Operations', () => {
    beforeEach(() => {
      component.pushCount(10, 'add');
      component.pushCount(5, 'add');
      component.pushCount(3, 'sub');
    });

    it('should undo operations correctly', () => {
      expect(component.currentCount).toBe(12);
      component.undo();
      expect(component.currentCount).toBe(15);
      component.undo();
      expect(component.currentCount).toBe(10);
    });

    it('should redo operations correctly', () => {
      component.undo();
      component.undo();
      expect(component.currentCount).toBe(10);
      component.redo();
      expect(component.currentCount).toBe(15);
      component.redo();
      expect(component.currentCount).toBe(12);
    });

    it('should disable undo when at initial state', () => {
      component.undo();
      component.undo();
      component.undo();
      expect(component.isUndoable).toBeFalse();
    });

    it('should disable redo when at latest state', () => {
      expect(component.isRedoable).toBeFalse();
      component.undo();
      expect(component.isRedoable).toBeTrue();
      component.redo();
      expect(component.isRedoable).toBeFalse();
    });
  });

  describe('Clear History', () => {
    it('should reset counter and history when cleared', () => {
      component.pushCount(10, 'add');
      component.pushCount(5, 'add');
      component.clearHistory();

      expect(component.currentCount).toBe(0);
      expect(component.countHistory).toEqual([0]);
      expect(component.currentIndex).toBe(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle multiple undo/redo operations', () => {
      component.pushCount(10, 'add');
      component.pushCount(5, 'add');
      component.undo();
      component.pushCount(3, 'add');
      expect(component.currentCount).toBe(13);
      expect(component.countHistory).toEqual([0, 10, 13]);
    });

    it('should maintain correct history after reaching MAX_LENGTH', () => {
      for (let i = 0; i < component.MAX_LENGTH; i++) {
        component.pushCount(1, 'add');
      }
      const toBeFirstValue = component.countHistory[1];
      const lastValue = component.currentCount;
      component.pushCount(5, 'add');
      expect(component.countHistory.length).toBe(component.MAX_LENGTH);
      expect(component.countHistory[0]).toBe(toBeFirstValue);
      expect(component.currentCount).toBe(lastValue + 5);
    });
  });
});
