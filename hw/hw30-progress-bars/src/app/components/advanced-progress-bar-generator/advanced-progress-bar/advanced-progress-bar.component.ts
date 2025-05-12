import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-advanced-progress-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './advanced-progress-bar.component.html',
  styleUrl: './advanced-progress-bar.component.css',
})
export class AdvancedProgressBarComponent {
  @Input() id = 0;
  @Input() progress = 0;
  @Input() isActive = false;
  @Output() completed = new EventEmitter<number>();

  duration = 2000;
  interval = 500;

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
        this.completed.emit(this.id);
      }
    }, this.interval - 100);
  }
}
