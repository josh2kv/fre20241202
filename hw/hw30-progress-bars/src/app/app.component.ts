import { Component } from '@angular/core';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProgressBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'hw30-progress-bars';
  progressBars: number[] = [];

  addProgressBar() {
    this.progressBars.push(this.progressBars.length + 1);
  }
}
