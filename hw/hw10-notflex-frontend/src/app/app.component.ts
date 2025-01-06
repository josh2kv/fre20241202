import { Component } from '@angular/core';
import { ThemeService } from '@core/services/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  // NOTE: When app is loaded, it registers a listener to the router events.
  constructor(private themeService: ThemeService) {}
}
