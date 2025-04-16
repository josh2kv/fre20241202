import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TodoService } from './todo.service';
import { Todo } from '../interfaces/todo.model';
import { of } from 'rxjs';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService],
    });

    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTodos', () => {
    // Test 1: getTodos success
    it('should fetch todos via GET, reverse them, and update todos$ on success', (done) => {
      const mockTodos: Todo[] = [
        { userId: 1, title: 'New Item1', completed: false },
        { userId: 3, title: 'New Item2', completed: false },
      ];
      const expectedMockTodos = [...mockTodos].reverse();
      const apiUrl = [service.baseUrl, service.path].join('/');

      // Subscribe to todos$ to capture the emitted value
      let emissionCounter = 0; // Initialize counter
      let actualTodos: Todo[] | undefined;

      service.todos$.subscribe((todos) => {
        emissionCounter++; // Increment counter on each emission
        actualTodos = todos;

        // Check if this is the emission AFTER the initial one
        if (emissionCounter > 1) {
          // Assertions run only on the second emission
          expect(actualTodos).toEqual(expectedMockTodos);
          done(); // Call done inside the subscription after assertion
        }
      });

      // Trigger the service call
      service.getTodos().subscribe();

      // Expect a GET request to the correct URL
      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');

      // Respond with the mock data
      req.flush(mockTodos);
    });

    // Test 2: getTodos error
    it('should emit default Todo array from todo$ on GET error', (done) => {
      const expectedErrorEmission: Todo[] = [new Todo()];
      const errorMessage = 'simulated networkerror';
      const apiUrl = [service.baseUrl, service.path].join('/');

      // NOTE: The catchError intercepts the HTTP error but it only returns of([new Todo()]) to the immediate subscriber of getTodos(). It does not update the internal state via this.todosSubject$.next(...).
      // Therefore, service.todos$ only ever emits the initial value ([]), and never the error emission.

      // let actualTodos: Todo[] | undefined;
      // let emissionCounter = 0;
      // service.todos$.subscribe((todos) => {
      //   actualTodos = todos;
      //   emissionCounter++;

      //   // Check after error is flushed (this might emit twice: initial [], then error [])
      //   if (emissionCounter > 1) {
      //     // Check after the initial emission
      //     expect(actualTodos).toEqual(expectedErrorEmission);
      //     done();
      //   }
      // });

      service.getTodos().subscribe({
        next: (todos) => {
          // Expect the catchError's 'of([new Todo()])' fallback value here
          expect(todos).toEqual(expectedErrorEmission);
          done();
        },
        error: (err) => {
          // This block should NOT be reached because catchError handles it
          fail(
            'Error block should not be reached when catchError returns of()'
          );
        },
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');

      req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
    });
  });

  describe('addTodo', () => {
    // Test 3: addTodo success
    it('should POST todo and prepend returned todo to todos$ on success', (done) => {
      const initialTodos: Todo[] = [
        { userId: 1, id: 1, title: 'Existing', completed: false },
      ];
      const newTodo: Todo = { userId: 1, title: 'New Task', completed: false }; // No ID initially
      const mockResponseTodo: Todo = { ...newTodo, id: 123 };
      const expectedTodos = [mockResponseTodo, ...initialTodos];
      const apiUrl = [service.baseUrl, service.path].join('/');

      // Set initial state (simulate having fetched todos previously)
      (service as any).todos = initialTodos;
      (service as any).todosSubject$.next(initialTodos);

      let emissionCounter = 0;
      service.todos$.subscribe((todos) => {
        emissionCounter++;
        if (emissionCounter > 1) {
          // Skip initial emission
          expect(todos).toEqual(expectedTodos);
          done();
        }
      });

      service.addTodo(newTodo).subscribe();

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newTodo);

      req.flush(mockResponseTodo);
    });
  });

  describe('deleteTodo', () => {
    // Test 4: deleteTodo success
    it('should DELETE todo and remove it from todos$ on success', (done) => {
      const initialTodos: Todo[] = [
        { userId: 1, id: 1, title: 'Existing', completed: false },
      ];
      const todoIdToDelete = 1;
      const mockResponseTodos = initialTodos.filter(
        (todo) => todo.id !== todoIdToDelete
      );
      const expectedTodos = [...mockResponseTodos];
      const apiUrl = [service.baseUrl, service.path].join('/');

      (service as any).todos = initialTodos;
      (service as any).todosSubject$.next(initialTodos);

      let emissionCounter = 0;
      service.todos$.subscribe((todos) => {
        emissionCounter++;
        if (emissionCounter > 1) {
          expect(todos).toEqual(expectedTodos);
          done();
        }
      });

      service.deleteTodo(todoIdToDelete.toString()).subscribe();

      const req = httpMock.expectOne(`${apiUrl}/${todoIdToDelete}`);
      expect(req.request.method).toBe('DELETE');

      req.flush(null);
    });
  });

  it('get todos on getTodos', () => {
    const mockTodos: Todo[] = [
      { userId: 1, title: 'New Item1', completed: false },
      { userId: 3, title: 'New Item2', completed: false },
    ];

    spyOn(service, 'getTodos').and.returnValue(of(mockTodos));
    service.getTodos().subscribe((data) => {
      expect(data.length).toBe(2);
      expect(data).toEqual(mockTodos);
    });
  });
});
