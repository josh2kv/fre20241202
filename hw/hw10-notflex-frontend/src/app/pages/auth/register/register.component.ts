import { Component } from '@angular/core';
import { ThemeService } from '@core/services/theme/theme.service';
import { ThemeMode } from '@shared/interfaces/common';

@Component({
  selector: 'app-register',
  standalone: false,

  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor() {}
}
