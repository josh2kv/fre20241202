import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../interfaces/todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {
  @Input() todoitem!: Todo;
  @Output() todoIdEmiter = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  clickdelete() {
    // console.log(this.todoitem.id);
    this.todoIdEmiter.emit(this.todoitem.id);
  }
}
