import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';

interface TodoItem {
  id: number;
  title: string;
  editing: boolean;
  checked: boolean;
}

interface NewTodoFormControls {
  title: FormControl<string>;
}

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  standalone: true,
})
export class TodoListComponent {
  private todoSignal = signal<TodoItem[]>([]);
  todos = this.todoSignal.asReadonly();
  isAllChecked = computed(() => {
    const currentTodos = this.todos();
    return (
      currentTodos.length > 0 && currentTodos.every((todo) => todo.checked)
    );
  });
  isAnyChecked = computed(() => {
    const currentTodos = this.todos();
    return currentTodos.some((todos) => todos.checked);
  });

  newTodoForm: FormGroup<NewTodoFormControls>;

  constructor(private fb: FormBuilder) {
    this.newTodoForm = this.fb.group({
      title: fb.control('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  addTodo(title: string) {
    this.todoSignal.update((todos) => [
      ...todos,
      { id: new Date().getTime(), title, editing: false, checked: false },
    ]);
  }

  deleteTodo(id: number) {
    this.todoSignal.update((todos) => todos.filter((todo) => todo.id !== id));
  }

  startEditingTodo(id: number) {
    this.todoSignal.update((todos) =>
      todos.map((todo) => {
        if (todo.id !== id) return todo;

        return { ...todo, editing: true };
      })
    );
  }

  saveEditingTodo(e: KeyboardEvent, id: number) {
    const inputValue = (e.target as HTMLInputElement).value;
    if (!inputValue) return;

    if (e.key === 'Enter') {
      this.todoSignal.update((todos) =>
        todos.map((todo) => {
          if (todo.id !== id) return todo;

          return {
            ...todo,
            title: inputValue,
            editing: false,
          };
        })
      );
    }
  }

  checkTodo(id: number) {
    this.todoSignal.update((todos) =>
      todos.map((todo) => {
        if (todo.id !== id) return todo;

        return { ...todo, checked: !todo.checked };
      })
    );
  }

  onNewTodoSubmit() {
    if (!this.newTodoForm.valid) return;

    this.addTodo(this.newTodoForm.controls.title.value);
    this.newTodoForm.reset();
  }

  toggleCheckAll() {
    if (this.isAllChecked()) {
      this.todoSignal.update((todos) =>
        todos.map((todo) => ({ ...todo, checked: false }))
      );
    } else {
      this.todoSignal.update((todos) =>
        todos.map((todo) => ({ ...todo, checked: true }))
      );
    }
  }

  deleteCheckedTodos() {
    this.todoSignal.update((todos) => todos.filter((todo) => !todo.checked));
  }
}
