import { Component } from '@angular/core';

@Component({
  selector: 'app-undoable-counter-without-subjects',
  standalone: false,
  templateUrl: './undoable-counter-without-subjects.component.html',
  styleUrl: './undoable-counter-without-subjects.component.scss',
})
export class UndoableCounterWithoutSubjectsComponent {
  MAX_LENGTH = 10;
  countHistory: number[] = [0];
  currentIndex: number = 0;

  constructor() {}

  pushCount(operand: number, type: 'add' | 'sub') {
    const newCount =
      type === 'add'
        ? this.currentCount + operand
        : this.currentCount - operand;

    if (this.isFull) {
      this.countHistory.shift();
      this.currentIndex--;
    }

    this.countHistory = [
      ...this.countHistory.slice(0, this.currentIndex + 1),
      newCount,
    ];

    this.currentIndex++;
  }

  undo() {
    if (!this.isUndoable) {
      alert('No history to undo');
      return;
    }

    this.currentIndex--;
  }

  redo() {
    if (!this.isRedoable) {
      alert('No history to redo');
      return;
    }

    this.currentIndex++;
  }

  clearHistory() {
    this.countHistory = [0];
    this.currentIndex = 0;
  }

  get currentCount(): number {
    return this.countHistory[this.currentIndex] ?? 0;
  }

  get isUndoable(): boolean {
    return !this.isAtHead;
  }

  get isRedoable(): boolean {
    return !this.isAtTail;
  }

  get isAtHead(): boolean {
    return this.currentIndex === 0;
  }

  get isAtTail(): boolean {
    return this.countHistory.length === this.currentIndex + 1;
  }

  get isFull(): boolean {
    return this.countHistory.length >= this.MAX_LENGTH;
  }
}
