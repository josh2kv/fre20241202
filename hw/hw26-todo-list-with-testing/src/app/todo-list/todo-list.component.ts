import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Todo } from '../interfaces/todo.model';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  newtodo = new Todo();
  // todolist!: Todo[];
  // Expose the service's observable directly to the template
  // The component no longer holds its own 'todolist' array
  todos$: Observable<Todo[]> = this.todolistService.todos$;

  constructor(private readonly todolistService: TodoService) {}

  ngOnInit(): void {
    this.todolistService.getTodos().subscribe({
      // Optional: Add error handling for the initial fetch trigger
      error: (err) =>
        console.error('Failed to trigger initial todo fetch', err),
    });
  }

  add() {
    if (!this.newtodo.title?.trim()) return;

    // Call the service method. The service handles updating the state.
    // Subscribe is necessary to trigger the cold observable from addTodo().
    this.todolistService.addTodo(this.newtodo).subscribe({
      next: () => {
        // Reset the form model only on successful addition
        this.newtodo = new Todo();
      },
      error: (err) => {
        // Log error or provide user feedback if the add fails
        console.error('Failed to add todo in component', err);
        // Potentially show an error message to the user here
      },
    });
  }

  deletetodo(id: string) {
    // Call the service method. The service handles updating the state.
    // Component no longer filters its own list.
    // Subscribe is necessary to trigger the cold observable from deleteTodo().
    this.todolistService.deleteTodo(id).subscribe({
      error: (err) => {
        // Log error or provide user feedback if the delete fails
        console.error('Failed to delete todo in component', err);
        // Potentially show an error message to the user here
      },
    });
  }
}
