# HW26TodoListWithTesting

- useful resource: <https://testing-angular.com/introduction/#introduction>

## Testing in Angular

### 1. Jasmine & Karma

- Jasmine: The default **testing framework** used by Angular. It provides functions like `describe` (to group tests), `it` (for individual test cases), `expect` (for assertions), `beforeEach`/`afterEach` (for setup/teardown), and `spyOn`/`createSpyObj` (for creating test spies and mocks). If you've used Jest in React, Jasmine's syntax (`describe`, `it`, `expect`) will feel very familiar.
- Karma: The default **test runner**. Karma opens a browser, runs your Jasmine tests against your compiled code, and reports the results. It's configured via `karma.conf.js`.

### 2. `TestBed`

- This is Angular's most important testing utility. Think of it as **a way to create an isolated Angular environment (`@NgModule`) specifically for your test**. In React testing (e.g., with React Testing Library), you might use `render` to get your component into a test DOM; `TestBed` serves a similar purpose but also handles Angular's module system and Dependency Injection (DI).
- Configuration: You configure `TestBed` using `TestBed.configureTestingModule({...})` inside a `beforeEach` block. Here you declare the component you're testing, provide mock services, import necessary Angular modules (`CommonModule`, `FormsModule`, `HttpClientTestingModule`, `RouterTestingModule`, etc.), just like you would in a regular `@NgModule`.

### 3. `ComponentFixture`

- When you test a component, you create it using `fixture = TestBed.createComponent(YourComponent);`. This returns a `ComponentFixture`.
- The fixture is **a wrapper around your component instance and its template**. Key properties:
  - `fixture.componentInstance`: The actual instance of your component class (e.g., `YourComponent`), allowing you to call its methods or check its properties.
  - `fixture.debugElement`: An Angular-specific wrapper around the component's DOM element, useful for querying the template using CSS selectors (debugElement.query(By.css(...))) or accessing injected directives/components.
  - `fixture.nativeElement`: The raw DOM element associated with the component's template. Good for simple DOM checks.
  - `fixture.detectChanges()`: Crucial. This tells Angular to run its change detection cycle. You need to call this after setting component inputs or anytime you expect the component's template to update based on its state. This is somewhat analogous to using `act` or `waitFor` in React Testing Library to ensure state updates are flushed to the DOM.

### 4. Dependency Injection (DI) & Mocking

- Angular's testing heavily relies on mocking dependencies provided through DI.
- Inside `TestBed.configureTestingModule`, you use the `providers` array to tell Angular: "When the component asks for `ActualService`, give it this `MockService` instead."
- Example:

  ```typescript
  import { TodoService } from './services/todo.service';
  // Create a mock object with the same shape as TodoService
  const mockTodoService = jasmine.createSpyObj('TodoService', ['getTodos', 'addTodo', 'deleteTodo']);
  // Mock the return value of a method
  mockTodoService.getTodos.and.returnValue(of([])); // Assuming RxJS 'of'

  TestBed.configureTestingModule({
    declarations: [TodoListComponent],
    providers: [
      // Provide the mock instead of the real service
      { provide: TodoService, useValue: mockTodoService }
    ]
  });
  ```

- You can then inject the mock service in your test (`mockService = TestBed.inject(TodoService);`) and check if its methods were called (`expect(mockService.addTodo).toHaveBeenCalledWith(...)`).

### 5. Testing Services

- Services often have dependencies themselves (like `HttpClient`).
- For services with no dependencies, you can often just instantiate them directly (`service = new MySimpleService();`).
- For services with dependencies, use `TestBed`:
  - Provide mocks for the service's dependencies (e.g., use `HttpClientTestingModule` for `HttpClient`).
  - Get an instance of the service using `service = TestBed.inject(MyService);`.
- `HttpClientTestingModule`: Specifically for testing HTTP requests. It provides `HttpTestingController` which lets you:
  - Assert that specific HTTP requests were made (`httpMock.expectOne(...)`).
  - Flush mock responses or errors to simulate server responses (`req.flush(...)`, `req.error(...)`).

### 6. Asynchronous Code

- Much of Angular involves asynchronous operations (HTTP requests, `setTimeout`, `RxJS`).
- Jasmine supports `async/await` with Promises.
- For `RxJS` observables, you often subscribe in your test and use Jasmine's `done` callback or `async/await`.
- Angular provides `fakeAsync`, `tick`, and `flush` utilities to test asynchronous code in a more synchronous-looking way, especially useful for things like `debounceTime` or `setTimeout`.

## React vs Angular Testing

| Feature | Angular | React |
|---------|---------|-------|
| Default tools | Jasmine + Karma (via Angular CLI) | Jest + React Testing Library |
| Philosophy | Test logic, structure, and DI interactions | Test behavior from the user’s view |
| Setup | Preconfigured with CLI | You choose (e.g., Create React App, Vite) |
| Speed | Slower (Karma browser-based runner) | Faster (Jest runs in Node) |
| Mocks | Manual or with `TestBed` | Built-in with Jest |
| Snapshot testing | Rare / Not common | Common and easy with Jest |
| Learning curve | Steeper (DI and module setup) | Easier (component-focused) |

## Why does `TodoService` need the `todos` array when it already has `todosSubject$`?

- Keeping the separate private `todos` array is a standard and often preferred pattern.
- Think of private `todos` as the service's internal workbench where it prepares the state, and `todosSubject$.next()` as the action of publishing the finished work from the bench to anyone watching (`todos$`). While `BehaviorSubject` does keep a copy of the last published work, having the separate workbench (`private todos`) makes the preparation process within the service cleaner and more explicit.

## Meanings of the tests

### `done()`

- Jasmine will not finish the test before `done()` is called.

```typescript
service.todos$.subscribe(todos => {
  // [3] Assertions run here, but if [2] is so fast, it can't be executed. Because the test is already finished.
    expect(actualTodos).toEqual(expectedReversedArray);
    // So we need to call `done()` to signal that the test is complete.
    // ✅ That way Jasmine will not finish the test before done() is called.
    done();
});

// [1] Trigger the service call which is an asynchronous operation.
service.getTodos().subscribe();
// [2] The rest of the test will be executed synchronously really fast.
```

## `expectOne()`: Expect one matching HTTP request to be made

- `flush()`: Send fake response to that request
- `verify()`: Make sure all expected requests were handled

- test suite: The describe() block is the test group.
- test case or spec: Each it() block inside is an individual test case.

## Why do I need an emission counter?

- Because `service.todos$` is based on a BehaviorSubject.
- BehaviorSubject is a type of Observable that requires an initial value and emits values to subscribers.
- When a test subscribes `to service.todos$`, it will receive the initial value first, and then any subsequent emissions from the BehaviorSubject.
- Therefore, we need to count the emissions to ensure we're testing the correct value.
