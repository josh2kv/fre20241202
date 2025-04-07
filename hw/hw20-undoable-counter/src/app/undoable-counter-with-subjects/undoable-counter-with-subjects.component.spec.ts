import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { UndoableCounterWithSubjectsComponent } from './undoable-counter-with-subjects.component';
import { By } from '@angular/platform-browser';
import { first } from 'rxjs';

describe('UndoableCounterWithSubjectsComponent', () => {
  let component: UndoableCounterWithSubjectsComponent;
  let fixture: ComponentFixture<UndoableCounterWithSubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UndoableCounterWithSubjectsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UndoableCounterWithSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initial state', () => {
    it('should start with count 0', (done) => {
      component.currentCount$.pipe(first()).subscribe((count) => {
        expect(count).toBe(0);
        done();
      });
    });

    it('should have undo button disabled initially', () => {
      const undoButton = fixture.debugElement.query(
        By.css('button:nth-of-type(1)')
      );
      expect(undoButton.nativeElement.disabled).toBe(true);
    });

    it('should have redo button disabled initially', () => {
      const redoButton = fixture.debugElement.query(
        By.css('button:nth-of-type(2)')
      );
      expect(redoButton.nativeElement.disabled).toBe(true);
    });
  });

  describe('Counter operations', () => {
    it('should add 1 to the count when +1 button is clicked', fakeAsync(() => {
      // Get initial count
      let initialCount: number = 0;
      component.currentCount$
        .pipe(first())
        .subscribe((count) => (initialCount = count));

      // Click +1 button
      const addOneButton = fixture.debugElement.query(
        By.css('.btn-group:nth-of-type(2) button:nth-of-type(1)')
      );
      addOneButton.nativeElement.click();
      tick();
      fixture.detectChanges();

      // Check if count increased by 1
      component.currentCount$.pipe(first()).subscribe((count) => {
        expect(count).toBe(initialCount + 1);
      });
    }));

    it('should add 10 to the count when +10 button is clicked', fakeAsync(() => {
      let initialCount: number = 0;
      component.currentCount$
        .pipe(first())
        .subscribe((count) => (initialCount = count));

      const addTenButton = fixture.debugElement.query(
        By.css('.btn-group:nth-of-type(2) button:nth-of-type(2)')
      );
      addTenButton.nativeElement.click();
      tick();
      fixture.detectChanges();

      component.currentCount$.pipe(first()).subscribe((count) => {
        expect(count).toBe(initialCount + 10);
      });
    }));

    it('should add 100 to the count when +100 button is clicked', fakeAsync(() => {
      let initialCount: number = 0;
      component.currentCount$
        .pipe(first())
        .subscribe((count) => (initialCount = count));

      const addHundredButton = fixture.debugElement.query(
        By.css('.btn-group:nth-of-type(2) button:nth-of-type(3)')
      );
      addHundredButton.nativeElement.click();
      tick();
      fixture.detectChanges();

      component.currentCount$.pipe(first()).subscribe((count) => {
        expect(count).toBe(initialCount + 100);
      });
    }));

    it('should subtract 1 from the count when -1 button is clicked', fakeAsync(() => {
      // First add 10 to make sure we have a positive number
      component.pushCount(10, 'add');
      tick();
      fixture.detectChanges();

      let initialCount: number = 0;
      component.currentCount$
        .pipe(first())
        .subscribe((count) => (initialCount = count));

      const subtractOneButton = fixture.debugElement.query(
        By.css('.btn-group:nth-of-type(1) button:nth-of-type(3)')
      );
      subtractOneButton.nativeElement.click();
      tick();
      fixture.detectChanges();

      component.currentCount$.pipe(first()).subscribe((count) => {
        expect(count).toBe(initialCount - 1);
      });
    }));

    it('should subtract 10 from the count when -10 button is clicked', fakeAsync(() => {
      // First add 20 to make sure we have a positive number
      component.pushCount(20, 'add');
      tick();
      fixture.detectChanges();

      let initialCount: number = 0;
      component.currentCount$
        .pipe(first())
        .subscribe((count) => (initialCount = count));

      const subtractTenButton = fixture.debugElement.query(
        By.css('.btn-group:nth-of-type(1) button:nth-of-type(2)')
      );
      subtractTenButton.nativeElement.click();
      tick();
      fixture.detectChanges();

      component.currentCount$.pipe(first()).subscribe((count) => {
        expect(count).toBe(initialCount - 10);
      });
    }));

    it('should subtract 100 from the count when -100 button is clicked', fakeAsync(() => {
      // First add 200 to make sure we have a positive number
      component.pushCount(200, 'add');
      tick();
      fixture.detectChanges();

      let initialCount: number = 0;
      component.currentCount$
        .pipe(first())
        .subscribe((count) => (initialCount = count));

      const subtractHundredButton = fixture.debugElement.query(
        By.css('.btn-group:nth-of-type(1) button:nth-of-type(1)')
      );
      subtractHundredButton.nativeElement.click();
      tick();
      fixture.detectChanges();

      component.currentCount$.pipe(first()).subscribe((count) => {
        expect(count).toBe(initialCount - 100);
      });
    }));
  });

  describe('History functionality', () => {
    it('should record actions in the history', fakeAsync(() => {
      // Clear any existing history
      component.clearHistory();
      tick();
      fixture.detectChanges();

      // Add 10
      component.pushCount(10, 'add');
      tick();
      fixture.detectChanges();

      // Check history
      component.history$.pipe(first()).subscribe((history) => {
        expect(history.length).toBe(2); // Initial state + our action
        expect(history[1].count).toBe(10);
        expect(history[1].action?.type).toBe('add');
        expect(history[1].action?.operand).toBe(10);
        expect(history[1].action?.prevCount).toBe(0);
      });
    }));

    it('should add an entry with the format: ACTION (BEFORE -> AFTER)', fakeAsync(() => {
      // Clear history
      component.clearHistory();
      tick();
      fixture.detectChanges();

      // Perform an action
      component.pushCount(5, 'add');
      tick();
      fixture.detectChanges();

      // Check history entry format
      component.history$.pipe(first()).subscribe((history) => {
        const lastItem = history[history.length - 1];
        expect(lastItem.action?.type).toBe('add');
        expect(lastItem.action?.operand).toBe(5);
        expect(lastItem.action?.prevCount).toBe(0);
        expect(lastItem.count).toBe(5);
      });
    }));

    it('should limit history to MAX_LENGTH entries', fakeAsync(() => {
      // Clear history
      component.clearHistory();
      tick();
      fixture.detectChanges();

      // Add more than MAX_LENGTH items
      for (let i = 0; i < component.MAX_LENGTH + 5; i++) {
        component.pushCount(1, 'add');
        tick();
      }
      fixture.detectChanges();

      // Check history length
      component.history$.pipe(first()).subscribe((history) => {
        expect(history.length).toBeLessThanOrEqual(component.MAX_LENGTH);
      });
    }));
  });

  describe('Undo/Redo functionality', () => {
    it('should enable undo button after an action', fakeAsync(() => {
      // Clear history
      component.clearHistory();
      tick();
      fixture.detectChanges();

      // Perform an action
      component.pushCount(1, 'add');
      tick();
      fixture.detectChanges();

      // Check if undo button is enabled
      component.isUndoable$.pipe(first()).subscribe((isUndoable) => {
        expect(isUndoable).toBe(true);
      });

      const undoButton = fixture.debugElement.query(
        By.css('button:nth-of-type(1)')
      );
      expect(undoButton.nativeElement.disabled).toBe(false);
    }));

    it('should undo the last action when undo button is clicked', fakeAsync(() => {
      // Clear history
      component.clearHistory();
      tick();
      fixture.detectChanges();

      // Perform action
      component.pushCount(10, 'add');
      tick();
      fixture.detectChanges();

      let countAfterAdd = 0;
      component.currentCount$
        .pipe(first())
        .subscribe((count) => (countAfterAdd = count));

      // Undo
      component.undo();
      tick();
      fixture.detectChanges();

      // Check if count reverted
      component.currentCount$.pipe(first()).subscribe((count) => {
        expect(count).toBe(countAfterAdd - 10);
      });
    }));

    it('should enable redo button after an undo', fakeAsync(() => {
      // Clear history
      component.clearHistory();
      tick();
      fixture.detectChanges();

      // Perform an action
      component.pushCount(1, 'add');
      tick();
      fixture.detectChanges();

      // Undo
      component.undo();
      tick();
      fixture.detectChanges();

      // Check if redo button is enabled
      component.isRedoable$.pipe(first()).subscribe((isRedoable) => {
        expect(isRedoable).toBe(true);
      });

      const redoButton = fixture.debugElement.query(
        By.css('button:nth-of-type(2)')
      );
      expect(redoButton.nativeElement.disabled).toBe(false);
    }));

    it('should redo the last undone action when redo button is clicked', fakeAsync(() => {
      // Clear history
      component.clearHistory();
      tick();
      fixture.detectChanges();

      // Perform action
      component.pushCount(20, 'add');
      tick();
      fixture.detectChanges();

      let countAfterAdd = 0;
      component.currentCount$
        .pipe(first())
        .subscribe((count) => (countAfterAdd = count));

      // Undo
      component.undo();
      tick();
      fixture.detectChanges();

      // Redo
      component.redo();
      tick();
      fixture.detectChanges();

      // Check if count is restored
      component.currentCount$.pipe(first()).subscribe((count) => {
        expect(count).toBe(countAfterAdd);
      });
    }));

    it('should clear history when clear button is clicked', fakeAsync(() => {
      // Add some actions
      component.pushCount(10, 'add');
      component.pushCount(20, 'add');
      tick();
      fixture.detectChanges();

      // Clear
      component.clearHistory();
      tick();
      fixture.detectChanges();

      // Check if history is reset
      component.history$.pipe(first()).subscribe((history) => {
        expect(history.length).toBe(1); // Just the initial state
      });

      component.currentCount$.pipe(first()).subscribe((count) => {
        expect(count).toBe(0);
      });
    }));
  });
});
