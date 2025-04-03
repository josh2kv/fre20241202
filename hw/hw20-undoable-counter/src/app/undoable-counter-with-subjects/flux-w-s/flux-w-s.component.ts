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

// Actions follow Flux pattern
type CounterAction =
  | { type: 'ADD'; payload: number }
  | { type: 'SUBTRACT'; payload: number }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'CLEAR' };
@Component({
  selector: 'app-flux-w-s',
  standalone: false,
  templateUrl: './flux-w-s.component.html',
  styleUrl: './flux-w-s.component.scss',
})
export class FluxWSComponent implements OnDestroy {
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
  readonly currentCount$ = this.state$.pipe(
    map((state) => state.history[state.currentIndex]?.count ?? 0)
  );
  readonly history$ = this.state$.pipe(map((state) => state.history));
  readonly currentIndex$ = this.state$.pipe(map((state) => state.currentIndex));
  readonly isUndoable$ = this.state$.pipe(
    map((state) => state.currentIndex > 0)
  );
  readonly isRedoable$ = this.state$.pipe(
    map((state) => state.currentIndex < state.history.length - 1)
  );

  // Reducer - pure function to handle state updates
  private reducer(state: CounterState, action: CounterAction): CounterState {
    switch (action.type) {
      case 'ADD':
        return this.handleCountOperation(state, 'add', action.payload);
      case 'SUBTRACT':
        return this.handleCountOperation(state, 'sub', action.payload);
      case 'UNDO':
        if (state.currentIndex <= 0) return state;
        return {
          ...state,
          currentIndex: state.currentIndex - 1,
        };
      case 'REDO':
        if (state.currentIndex >= state.history.length - 1) return state;
        return {
          ...state,
          currentIndex: state.currentIndex + 1,
        };
      case 'CLEAR':
        return {
          history: [
            {
              count: 0,
              action: null,
            },
          ],
          currentIndex: 0,
        };
      default:
        return state;
    }
  }

  private handleCountOperation(
    state: CounterState,
    operator: 'add' | 'sub',
    operand: number
  ): CounterState {
    const currentHistoryItem = state.history[state.currentIndex];
    const prevCount = currentHistoryItem.count;
    const newCount =
      operator === 'add' ? prevCount + operand : prevCount - operand;

    const newHistoryItem: CounterHistoryItem = {
      count: newCount,
      action: {
        prevCount,
        operator,
        operand,
      },
    };

    // Create new history by truncating future entries (if any)
    const newHistory = [
      ...state.history.slice(0, state.currentIndex + 1),
      newHistoryItem,
    ];

    // Apply max length limit
    const finalHistory =
      newHistory.length > this.MAX_LENGTH
        ? newHistory.slice(newHistory.length - this.MAX_LENGTH)
        : newHistory;

    // Calculate new index, adjusting if history was truncated
    const newIndex = finalHistory.length - 1;

    return {
      history: finalHistory,
      currentIndex: newIndex,
    };
  }

  // Dispatch action to update state
  dispatch(action: CounterAction): void {
    const currentState = this.store.value;
    const newState = this.reducer(currentState, action);
    this.store.next(newState);
  }

  // Public API for components
  add(amount: number): void {
    this.dispatch({ type: 'ADD', payload: amount });
  }

  subtract(amount: number): void {
    this.dispatch({ type: 'SUBTRACT', payload: amount });
  }

  undo(): void {
    this.dispatch({ type: 'UNDO' });
  }

  redo(): void {
    this.dispatch({ type: 'REDO' });
  }

  clear(): void {
    this.dispatch({ type: 'CLEAR' });
  }

  ngOnDestroy(): void {
    this.store.complete();
  }
}
