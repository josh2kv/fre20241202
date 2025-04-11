import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  standalone: false,
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
  sessionRemained = 0;

  constructor(private authService: AuthService, private router: Router) {
    setInterval(() => {
      const sessionRemained = this.authService.getSessionRemained();
      this.sessionRemained = sessionRemained < 0 ? 0 : sessionRemained;
    }, 1000);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
