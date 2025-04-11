import { Injectable, OnDestroy, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  distinctUntilChanged,
  Subject,
  takeUntil,
} from 'rxjs';
import { AuthService } from './auth.service';
import {
  retrieveDataFromLocalStorage,
  storeDataToLocalStorage,
} from '../utils';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TodosService implements OnInit {
  readonly TODOS_KEY = 'todos';
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todosSubject.asObservable();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$
      .pipe(distinctUntilChanged())
      .subscribe((user) => {
        console.log('user', user);
        if (!user) return;
        const todos = retrieveDataFromLocalStorage<Todo[]>(
          `${this.TODOS_KEY}-${user}`
        );
        console.log('todos', todos);

        if (todos) {
          this.todosSubject.next(todos);
        } else {
          storeDataToLocalStorage(`${this.TODOS_KEY}-${user}`, []);
          this.todosSubject.next([]);
        }
      });

    this.todosSubject
      .pipe()
      .subscribe((todos) =>
        storeDataToLocalStorage(
          `${this.TODOS_KEY}-${this.authService.currentUser}`,
          todos
        )
      );
  }
  addTodo(title: string) {
    this.todosSubject.next([
      ...this.todosSubject.value,
      { id: this.generateId(), title, completed: false },
    ]);
  }

  getTodos(): Todo[] {
    return this.todosSubject.getValue();
  }

  toggleTodo(id: string) {
    this.todosSubject.next(
      this.todosSubject.value.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  removeTodo(id: string) {
    this.todosSubject.next(
      this.todosSubject.value.filter((todo) => todo.id !== id)
    );
  }

  generateId(): string {
    const timestamp = Date.now();
    const username = this.authService.currentUser || 'anonymous';

    return `${username}__${timestamp}`;
  }
}
