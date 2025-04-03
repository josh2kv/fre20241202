import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';

interface CountAction {
  prevCount: number;
  type: 'add' | 'sub';
  operand: number;
}

interface CounterItem {
  count: number;
  action: CountAction | null;
}

interface CounterState {
  history: CounterItem[];
  currentIndex: number;
}

@Component({
  selector: 'app-undoable-counter-with-subjects',
  standalone: false,
  templateUrl: './undoable-counter-with-subjects.component.html',
  styleUrl: './undoable-counter-with-subjects.component.scss',
})
export class UndoableCounterWithSubjectsComponent implements OnDestroy {
  readonly MAX_LENGTH = 11;
  private readonly counterStateSubject = new BehaviorSubject<CounterState>({
    history: [
      {
        count: 0,
        action: null,
      },
    ],
    currentIndex: 0,
  });
  readonly counterState$ = this.counterStateSubject.asObservable();
  readonly currentCount$ = this.counterState$.pipe(
    map((state) => state.history[state.currentIndex]?.count ?? 0)
  );
  readonly history$ = this.counterState$.pipe(map((state) => state.history));
  readonly currentIndex$ = this.counterState$.pipe(
    map((state) => state.currentIndex)
  );
  readonly isUndoable$ = this.counterState$.pipe(
    map((state) => state.currentIndex > 0)
  );
  readonly isRedoable$ = this.counterState$.pipe(
    map((state) => state.currentIndex < state.history.length - 1)
  );

  pushCount(operand: number, type: 'add' | 'sub'): void {
    const currentState = this.counterStateSubject.value;
    const currentItem = currentState.history[currentState.currentIndex];
    const currentCount = currentItem.count;
    const newCount =
      type === 'add' ? currentCount + operand : currentCount - operand;

    const newItem: CounterItem = {
      count: newCount,
      action: {
        prevCount: currentCount,
        type: type,
        operand,
      },
    };

    let newHistory = [
      ...currentState.history.slice(0, currentState.currentIndex + 1),
      newItem,
    ];

    if (newHistory.length > this.MAX_LENGTH) {
      newHistory.shift();
    }

    this.counterStateSubject.next({
      history: newHistory,
      currentIndex: newHistory.length - 1,
    });
  }

  undo(): void {
    const currentState = this.counterStateSubject.value;
    if (currentState.currentIndex < 1) return;

    this.counterStateSubject.next({
      ...currentState,
      currentIndex: currentState.currentIndex - 1,
    });
  }

  redo(): void {
    const currentState = this.counterStateSubject.value;
    if (currentState.currentIndex > currentState.history.length - 1) return;

    this.counterStateSubject.next({
      ...currentState,
      currentIndex: currentState.currentIndex + 1,
    });
  }

  clearHistory(): void {
    this.counterStateSubject.next({
      history: [
        {
          count: 0,
          action: null,
        },
      ],
      currentIndex: 0,
    });
  }

  ngOnDestroy(): void {
    this.counterStateSubject.complete();
  }
}
