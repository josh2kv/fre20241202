import { Component, computed, signal } from '@angular/core';
import { AdvancedProgressBarComponent } from './advanced-progress-bar/advanced-progress-bar.component';

interface ProgressBarState {
  id: number;
  isActive: boolean;
  isCompleted: boolean;
}

@Component({
  selector: 'app-advanced-progress-bar-generator',
  standalone: true,
  imports: [AdvancedProgressBarComponent],
  templateUrl: './advanced-progress-bar-generator.component.html',
  styleUrl: './advanced-progress-bar-generator.component.css',
})
export class AdvancedProgressBarGeneratorComponent {
  _progressBars = signal<ProgressBarState[]>([]);
  progressBars = computed(() => this._progressBars());

  currentId = -1;

  addProgressBar() {
    const lastBar = this.progressBars()[this.progressBars().length - 1];

    // first bar
    if (!lastBar) {
      this.currentId++;
    }

    this._progressBars.update((bars) => [
      ...bars,
      {
        id: bars.length,
        isActive: bars.length === 0 ? true : lastBar.isCompleted,
        isCompleted: false,
      },
    ]);
  }

  startNext() {
    this.currentId++;
    console.log('startNext', this.currentId);
    if (this.currentId < this.progressBars().length) {
      this._progressBars.update((bars) => {
        bars[this.currentId].isActive = true;
        return bars;
      });
    }
  }

  onCompleted(id: number) {
    if (id < this.progressBars().length) {
      this._progressBars.update((bars) => {
        console.log('onCompleted', bars);
        bars[id].isActive = false;
        bars[id].isCompleted = true;
        return bars;
      });
    }

    this.startNext();
  }
}
