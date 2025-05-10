import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersTableComponent } from './components/users-table/users-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UsersTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'hw29-data-table-standalone';
}
