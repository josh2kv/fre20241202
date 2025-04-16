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
      const reversedMockTodos = [...mockTodos].reverse();
      const apiUrl = [service.baseUrl, service.path].join('/');

      // Subscribe to todos$ to capture the emitted value
      let actualTodos: Todo[] | undefined;
      service.todos$.subscribe((todos) => {
        actualTodos = todos;
        // If actualTodos is not undefined, it means todos$ has emitted.
        // Check if it matches the expected result only after the request is flushed
        if (actualTodos !== undefined && actualTodos.length > 0) {
          // Check length to avoid initial empty emission

          expect(actualTodos).toEqual(reversedMockTodos);
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
