import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css',
})
export class ProgressBarComponent implements OnInit {
  progress = 0;
  duration = 2000;
  interval = 500;

  ngOnInit(): void {
    this.startProgress();
  }

  startProgress() {
    const increment = 100 * (this.interval / this.duration);

    setTimeout(() => {
      this.progress += increment;
    }, 0);

    const intervalId = setInterval(() => {
      this.progress += increment;

      if (this.progress >= 100) {
        this.progress = 100;
        clearInterval(intervalId);
      }
      // increment progress value in advance before the transition to make transition smooth
    }, this.interval - 100);
  }
}
