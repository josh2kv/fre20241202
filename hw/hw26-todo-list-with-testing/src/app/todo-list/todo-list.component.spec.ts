import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TodoListComponent } from './todo-list.component';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../services/todo.service';
import { Todo } from '../interfaces/todo.model';
import { of } from 'rxjs';
import { TodoItemComponent } from '../todo-item/todo-item.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  const mockTodos: Todo[] = [{userId: 1, title: 'New Item1', completed: false},
    {userId: 3, title: 'New Item2', completed: false}
  ]
  let mockTodoService: jasmine.SpyObj<TodoService>;
  

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('TodoService', ['getTodos', 'addTodo', 'deleteTodo']);
    await TestBed.configureTestingModule({
      declarations: [TodoListComponent, TodoItemComponent],
      providers: [{provide: TodoService, useValue: spy}],
      // providers: [TodoService],
      imports: [HttpClientTestingModule, FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    mockTodoService = TestBed.inject(TodoService) as jasmine.SpyObj<TodoService>;
    // Added to fix error in class
    mockTodoService.getTodos.and.returnValue(of(mockTodos));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new todo',() =>{
    const newTodo: Todo = {userId: 3, title: 'New Item', completed: false};
    component.newtodo = newTodo;
    // Added to fix error in class
    // Since we are using mock service, we need to invoke the mehod
    mockTodoService.addTodo.and.returnValue(of(newTodo));
    component.add();
    expect(mockTodoService.addTodo).toHaveBeenCalledWith(newTodo);
    expect(component.todolist.length).toBe(3);
    expect(component.todolist[0].title).toBe('New Item');
  })
});