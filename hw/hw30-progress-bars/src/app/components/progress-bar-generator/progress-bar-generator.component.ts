import { Component } from '@angular/core';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';

@Component({
  selector: 'app-progress-bar-generator',
  standalone: true,
  imports: [ProgressBarComponent],
  templateUrl: './progress-bar-generator.component.html',
  styleUrl: './progress-bar-generator.component.css',
})
export class ProgressBarGeneratorComponent {
  progressBars: number[] = [];

  addProgressBar() {
    this.progressBars.push(this.progressBars.length + 1);
  }
}
