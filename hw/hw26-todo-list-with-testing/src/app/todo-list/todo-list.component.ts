import { Component, ElementRef, ViewChild } from '@angular/core';
import { tap } from 'rxjs';
import { Todo } from '../interfaces/todo.model';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
    newtodo = new Todo();
    todolist!: Todo[];
  
    constructor(
      private readonly todolistService: TodoService // private readonly store: Store
    ) {}
  
    ngOnInit(): void {
      this.todolistService.getTodos().subscribe((data: Todo[]) => {
        this.todolist = data;
      });
    }
  
    add() {
      this.todolistService
        .addTodo(this.newtodo)
        .pipe(
          tap((val) => {
            this.todolist = [val, ...this.todolist];
          })
        )
        .subscribe();
    }
  
    deletetodo(id: string) {
      this.todolist = this.todolist.filter((todo) =>
        todo.id ? +todo.id !== +id : true
      );
      this.todolistService.deleteTodo(id);
    }
  
}
