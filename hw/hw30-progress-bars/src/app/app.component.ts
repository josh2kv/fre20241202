import { Component } from '@angular/core';
import { ProgressBarGeneratorComponent } from './components/progress-bar-generator/progress-bar-generator.component';
import { AdvancedProgressBarGeneratorComponent } from './components/advanced-progress-bar-generator/advanced-progress-bar-generator.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ProgressBarGeneratorComponent,
    AdvancedProgressBarGeneratorComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'hw30-progress-bars';
}
