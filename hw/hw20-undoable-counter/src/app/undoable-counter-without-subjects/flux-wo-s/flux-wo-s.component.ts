import { Component } from '@angular/core';

// Define Action Types
type ActionType = 'ADD' | 'SUBTRACT' | 'UNDO' | 'REDO' | 'CLEAR';

// Define Action interface
interface Action {
  type: ActionType;
  payload?: number;
}

// Define State interface
interface CounterState {
  countHistory: number[];
  currentIndex: number;
}

@Component({
  selector: 'app-flux-wo-s',
  standalone: false,
  templateUrl: './flux-wo-s.component.html',
  styleUrl: './flux-wo-s.component.scss',
})
export class FluxWoSComponent {
  // State
  MAX_LENGTH = 10;
  private state: CounterState = {
    countHistory: [0],
    currentIndex: 0,
  };

  constructor() {}

  // Action Creators
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

  clearHistory(): void {
    this.dispatch({ type: 'CLEAR' });
  }

  // Dispatcher
  private dispatch(action: Action): void {
    const newState = this.reducer(this.state, action);
    this.state = newState;
  }

  // Reducer (pure function)
  private reducer(state: CounterState, action: Action): CounterState {
    switch (action.type) {
      case 'ADD':
        return this.handleCountChange(state, action.payload!, 'add');
      case 'SUBTRACT':
        return this.handleCountChange(state, action.payload!, 'sub');
      case 'UNDO':
        if (!this.isUndoable) {
          alert('No history to undo');
          return state;
        }
        return {
          ...state,
          currentIndex: state.currentIndex - 1,
        };
      case 'REDO':
        if (!this.isRedoable) {
          alert('No history to redo');
          return state;
        }
        return {
          ...state,
          currentIndex: state.currentIndex + 1,
        };
      case 'CLEAR':
        return {
          countHistory: [0],
          currentIndex: 0,
        };
      default:
        return state;
    }
  }

  // Helper method for count changes
  private handleCountChange(
    state: CounterState,
    operand: number,
    type: 'add' | 'sub'
  ): CounterState {
    const currentCount = state.countHistory[state.currentIndex] ?? 0;
    const newCount =
      type === 'add' ? currentCount + operand : currentCount - operand;

    // Create new history truncating any future states
    let newHistory = [
      ...state.countHistory.slice(0, state.currentIndex + 1),
      newCount,
    ];

    // Handle MAX_LENGTH limit
    if (newHistory.length > this.MAX_LENGTH) {
      newHistory = newHistory.slice(newHistory.length - this.MAX_LENGTH);
    }

    // Adjust the current index if history was shifted
    const newIndex =
      newHistory.length > this.MAX_LENGTH
        ? state.currentIndex - (newHistory.length - this.MAX_LENGTH) + 1
        : state.currentIndex + 1;

    return {
      countHistory: newHistory,
      currentIndex: newIndex,
    };
  }

  // Selectors (getters)
  get countHistory(): number[] {
    return this.state.countHistory;
  }

  get currentIndex(): number {
    return this.state.currentIndex;
  }

  get currentCount(): number {
    return this.state.countHistory[this.state.currentIndex] ?? 0;
  }

  get isUndoable(): boolean {
    return !this.isAtHead;
  }

  get isRedoable(): boolean {
    return !this.isAtTail;
  }

  get isAtHead(): boolean {
    return this.state.currentIndex === 0;
  }

  get isAtTail(): boolean {
    return this.state.countHistory.length === this.state.currentIndex + 1;
  }

  get isFull(): boolean {
    return this.state.countHistory.length >= this.MAX_LENGTH;
  }

  // For templates that use old method names
  pushCount(operand: number, type: 'add' | 'sub'): void {
    type === 'add' ? this.add(operand) : this.subtract(operand);
  }
}
