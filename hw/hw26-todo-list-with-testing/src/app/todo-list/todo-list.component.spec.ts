import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';
import { TodoService } from '../services/todo.service';
import { Todo } from '../interfaces/todo.model';
import { BehaviorSubject, of, tap, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms'; // Needed for ngModel
import { NO_ERRORS_SCHEMA } from '@angular/core'; // To avoid declaring TodoItemComponent or use CUSTOM_ELEMENTS_SCHEMA
import { By } from '@angular/platform-browser';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let mockTodoService: jasmine.SpyObj<TodoService>;
  let mockTodosSubject: BehaviorSubject<Todo[]>;

  // Mock data
  const mockInitialTodos: Todo[] = [
    { id: 1, userId: 1, title: 'Initial Todo 1', completed: false },
    { id: 2, userId: 1, title: 'Initial Todo 2', completed: true },
  ];
  const mockAddedTodo: Todo = {
    id: 3,
    userId: 1,
    title: 'Added Todo',
    completed: false,
  };

  beforeEach(async () => {
    // Create mock subject and observable
    // Initialize with empty array, ngOnInit should trigger the fetch
    mockTodosSubject = new BehaviorSubject<Todo[]>([]);

    // Create spy object for the service
    mockTodoService = jasmine.createSpyObj(
      'TodoService',
      ['getTodos', 'addTodo', 'deleteTodo'],
      // Define todos$ as a getter property on the mock that returns our subject's observable
      { todos$: mockTodosSubject.asObservable() }
    );

    // Configure initial mock returns
    // getTodos should simulate the service fetching and updating the subject
    mockTodoService.getTodos.and.returnValue(
      of(mockInitialTodos).pipe(
        // Simulate service updating the subject after fetch
        tap(() => mockTodosSubject.next(mockInitialTodos))
      )
    );
    mockTodoService.addTodo.and.returnValue(of(mockAddedTodo)); // Default success for add
    mockTodoService.deleteTodo.and.returnValue(of({})); // Default success for delete

    await TestBed.configureTestingModule({
      declarations: [TodoListComponent],
      imports: [FormsModule], // Import FormsModule for [(ngModel)]
      providers: [{ provide: TodoService, useValue: mockTodoService }],
      // Use NO_ERRORS_SCHEMA to ignore <app-todo-item> if you don't want to declare/import it
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    // NOTE: Don't call fixture.detectChanges() here in the main beforeEach
    // Call it inside each test or a nested beforeEach AFTER configuring mocks for that test
  });

  it('should create', () => {
    fixture.detectChanges(); // Need to trigger initialization
    expect(component).toBeTruthy();
  });

  it('should call getTodos on init', () => {
    fixture.detectChanges(); // Trigger ngOnInit
    expect(mockTodoService.getTodos).toHaveBeenCalledTimes(1);
  });

  it('should render todo items based on todos$ emitted values', () => {
    fixture.detectChanges(); // Trigger ngOnInit -> getTodos -> subject emits mockInitialTodos

    // At this point, mockTodosSubject should hold mockInitialTodos
    // and the async pipe should render them
    fixture.detectChanges(); // Run change detection again for the async pipe

    const todoItemDebugElements = fixture.debugElement.queryAll(
      By.css('app-todo-item')
    );
    expect(todoItemDebugElements.length).toBe(mockInitialTodos.length);
    // You could add more checks here, e.g., verify the @Input() passed to the first item
    // expect(todoItemDebugElements[0].componentInstance.todoitem).toEqual(mockInitialTodos[0]); // Requires not using NO_ERRORS_SCHEMA
  });

  describe('add() method', () => {
    it('should call todoService.addTodo with form value and reset form on success', () => {
      fixture.detectChanges(); // Initial render + ngOnInit call

      const newTitle = 'Test Add';
      component.newtodo.title = newTitle; // Set form value

      // Simulate successful addition updating the stream
      const expectedAddedTodo = { ...component.newtodo, id: Date.now() }; // Simulate ID assignment
      mockTodoService.addTodo.and.callFake((todo) => {
        const currentTodos = mockTodosSubject.value;
        mockTodosSubject.next([...currentTodos, expectedAddedTodo]); // Simulate service updating the stream
        return of(expectedAddedTodo); // Return the added todo from the service call
      });

      component.add(); // Call the component method
      fixture.detectChanges(); // Allow component updates (e.g., form reset)

      // Check service call
      expect(mockTodoService.addTodo).toHaveBeenCalledWith(
        jasmine.objectContaining({ title: newTitle })
      );
      // Check form reset
      expect(component.newtodo.title).toBe(''); // Or check against `new Todo().title`
    });

    it('should call todoService.addTodo and NOT reset form on error', () => {
      fixture.detectChanges(); // Initial render + ngOnInit call

      const newTitle = 'Test Add Error';
      component.newtodo.title = newTitle;

      // Simulate failed addition
      mockTodoService.addTodo.and.returnValue(
        throwError(() => new Error('Failed to add'))
      );

      component.add(); // Call the method
      fixture.detectChanges(); // Allow component updates

      // Check service call
      expect(mockTodoService.addTodo).toHaveBeenCalledWith(
        jasmine.objectContaining({ title: newTitle })
      );
      // Check form NOT reset
      expect(component.newtodo.title).toBe(newTitle);
    });
  });

  describe('deletetodo() method', () => {
    it('should call todoService.deleteTodo with the correct id', () => {
      fixture.detectChanges(); // Initial render + ngOnInit call

      const testId = 'test-id-123';
      // Ensure the mock returns an observable so subscribe() doesn't fail
      mockTodoService.deleteTodo.and.returnValue(of({}));

      component.deletetodo(testId); // Call the method
      fixture.detectChanges(); // Allow component updates

      // Check service call
      expect(mockTodoService.deleteTodo).toHaveBeenCalledWith(testId);
    });
  });
});
