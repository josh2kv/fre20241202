import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-advanced-progress-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './advanced-progress-bar.component.html',
  styleUrl: './advanced-progress-bar.component.css',
})
export class AdvancedProgressBarComponent implements OnChanges {
  @Input() id = 0;
  @Input() isActive = false;
  @Output() completed = new EventEmitter<number>();

  duration = 2000;
  interval = 500;
  progress = 0;

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
    // Check if isActive property has changed
    if (changes['isActive'] && changes['isActive'].currentValue === true) {
      this.startProgress();
    }
  }

  startProgress() {
    if (!this.isActive) return;
    this.progress = 0;
    const increment = 100 * (this.interval / this.duration);

    setTimeout(() => {
      this.progress += increment;
    }, 0);

    const intervalId = setInterval(() => {
      this.progress += increment;

      if (this.progress >= 100) {
        this.progress = 100;
        clearInterval(intervalId);

        // wait for the interval to finish
        setTimeout(() => {
          this.completed.emit(this.id);
        }, this.interval);
      }
    }, this.interval - 100);
  }
}
