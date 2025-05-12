import { Component } from '@angular/core';
import { AdvancedProgressBarComponent } from './advanced-progress-bar/advanced-progress-bar.component';

@Component({
  selector: 'app-advanced-progress-bar-generator',
  standalone: true,
  imports: [AdvancedProgressBarComponent],
  templateUrl: './advanced-progress-bar-generator.component.html',
  styleUrl: './advanced-progress-bar-generator.component.css',
})
export class AdvancedProgressBarGeneratorComponent {}
