import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollPositionService {
  private scrollPosition: number = 0;
  constructor() {}

  getScrollPosition(): number {
    return this.scrollPosition;
  }

  setScrollPosition(position: number): void {
    this.scrollPosition = position;
  }
}
