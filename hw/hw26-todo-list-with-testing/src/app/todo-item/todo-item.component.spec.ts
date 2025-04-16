import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemComponent } from './todo-item.component';
import { Todo } from '../interfaces/todo.model';

describe('TodoItemComponent', () => {
  const mockTodo: Todo = {
    id: 999,
    userId: 1,
    title: 'Test Item Title',
    completed: false,
  };

  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    // Don't call detectChanges here yet if we set Input AFTER creation
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the todo item title passed via input', () => {
    component.todoitem = mockTodo;
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    // Basic check if the title text content exists within the component's template
    // This assumes the title is directly rendered somewhere in the component's HTML
    expect(element.textContent).toContain(mockTodo.title);

    // NOTE: Alternatively, if you have a specific element with a class/id for the title:
    // const titleElement = fixture.debugElement.query(By.css('.todo-title')); // Example selector
    // expect(titleElement?.nativeElement.textContent).toBe(mockTodo.title);
  });

  it('should emit todoitem.id via todoIdEmitter when clickdelete() is called', () => {
    const mockTodo: Todo = {
      id: 999,
      userId: 1,
      title: 'Test Item Title',
      completed: false,
    };

    component.todoitem = mockTodo;
    fixture.detectChanges();

    // NOTE: Spy on the emit method BEFORE it's called
    spyOn(component.todoIdEmiter, 'emit');

    const deleteButton = fixture.nativeElement.querySelector('button');
    if (deleteButton) {
      deleteButton.click();
    } else {
      fail('Delete button not found in the template');
    }

    // Now this assertion will work because it's checking the spy
    expect(component.todoIdEmiter.emit).toHaveBeenCalledWith(mockTodo.id);
  });
});
