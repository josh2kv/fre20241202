import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Todo, TodosService } from '../../services/todos.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

type Timeout = ReturnType<typeof setTimeout>;
interface NewTodoFormControls {
  title: FormControl<string>;
}
@Component({
  selector: 'app-todo-list',
  standalone: false,
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  sessionRemained = 0;
  intervalId: Timeout | null = null;
  newTodoForm: FormGroup<NewTodoFormControls>;
  todos: Todo[] = [];

  constructor(
    private fb: FormBuilder,
    private todosService: TodosService,
    private authService: AuthService,
    private router: Router
  ) {
    this.newTodoForm = this.fb.group({
      title: this.fb.control('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });

    this.intervalId = setInterval(() => {
      const sessionRemained = this.authService.getSessionRemained();
      this.sessionRemained = sessionRemained < 0 ? 0 : sessionRemained;
    }, 1000);
  }

  ngOnInit(): void {
    this.todosService.todos$
      .pipe(takeUntil(this.destroy$))
      .subscribe((todos) => {
        this.todos = todos;
      });
  }

  onSubmit() {
    this.checkSession();

    if (!this.newTodoForm.valid) return;

    this.todosService.addTodo(this.newTodoForm.value.title!);
    this.newTodoForm.reset();
  }

  toggleTodo(id: string) {
    this.checkSession();

    this.todosService.toggleTodo(id);
  }

  removeTodo(id: string) {
    this.checkSession();

    this.todosService.removeTodo(id);
  }

  checkSession(): void {
    if (this.sessionRemained <= 0) {
      alert('Session expired');
      this.logout();
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.destroy$.next();
    this.destroy$.complete();
  }
}
