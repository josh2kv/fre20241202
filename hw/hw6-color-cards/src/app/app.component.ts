import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'hw6-color-cards';
  themeColor: string = 'gray';

  handleSetThemeColor(color: string) {
    this.themeColor = color;
  }
}
