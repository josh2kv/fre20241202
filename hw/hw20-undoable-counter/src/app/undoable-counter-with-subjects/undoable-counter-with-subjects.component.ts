import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

interface CountAction {
  prevCount: number;
  operator: 'add' | 'sub';
  operand: number;
}

interface CounterHistoryItem {
  count: number;
  action: CountAction | null;
}

interface CounterState {
  history: CounterHistoryItem[];
  currentIndex: number;
}

@Component({
  selector: 'app-undoable-counter-with-subjects',
  standalone: false,
  templateUrl: './undoable-counter-with-subjects.component.html',
  styleUrl: './undoable-counter-with-subjects.component.scss',
})
export class UndoableCounterWithSubjectsComponent implements OnDestroy {
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  readonly MAX_LENGTH = 50; // Per requirements

  // State store (single source of truth)
  private readonly store = new BehaviorSubject<CounterState>({
    history: [
      {
        count: 0,
        action: null,
      },
    ],
    currentIndex: 0,
  });

  // Selectors (derived state)
  readonly state$ = this.store.asObservable();
}
