# Hw23TodoListWithAuth

## Requirements

Create an Angular application with a simple authentication system and a todo list. The application should include the following features:

1. User login: A user should be able to enter a username to log in. You can hardcode password
2. Persistent Authentication: Once logged in, the user should remain authenticated until log out, even if page is refreshed.
3. Access control: The todo list should only be accessible to logged in users. If an unauthenticated user tries to access todo list, they should be redirected to the login page.
4. Todo list: logged in users should be able to Add new task, Mark tasks as completed, Delete tasks
5. Logout: Users should be able to log out which should remove their authentication status and return them to login page.
6. Access control additional request (optional):

   - a. using ReactiveFrom, create an Async validator for the username formcontrol,
     if the user input an exist user in your user list, show :white_check_mark: in somewhere, if user not exist show :no_entry_sign:
   - b. add debounce time to the username formcontrol

## Routes without leading slash

Angular's routing system is designed to handle paths without leading slashes. When you define routes in your Angular application, you should follow these conventions:

1. Route paths should not include leading slashes
2. Redirects should use the path name without leading slashes
The reason your routes aren't working with the leading slashes is that Angular treats the path definitions differently from the actual URL in the browser. In Angular's routing system:

- path: 'login' matches the URL /login
- If you write path: '/login', Angular looks for a URL that is literally //login (with double slash)

## `Subject.getValue()` vs `Subject.value`

They both return the same current value

- Use getValue() when:
  - You need more explicit error handling
  - Working in strict TypeScript environments
  - Code clarity is a priority
  - You might extend the code with error catching
- Use value when:
  - You want more concise code
  - You're sure the BehaviorSubject is properly initialized
  - You're working in a context where brevity matters

## `Subject.subscribe()` vs `Subject.asObservable().subscribe()`

Both Subject and its Observable have subscribe methods, but there are important differences:

1. Direction of data flow:

   - When you subscribe to a Subject directly, you're connecting to both the producer and consumer sides
   - When you subscribe to the Observable (via .asObservable()), you're connecting only to the consumer side

2. Mutation capabilities:

   - Subject subscription gives you access to the .next(), .error(), and .complete() methods
   - Observable subscription only lets you consume values, not emit new ones

3. Encapsulation and safety:

   - Using subject.asObservable().subscribe() follows the principle of exposing only what's needed
   - This prevents consumers from accidentally calling .next() on your subject

📌 Best practice is to expose the Observable (this.users) to external components and keep the Subject (this.usersSubject) private for internal state management.

### When to subscribe to Subjects directly

You should subscribe to subjects directly only within the service itself or in components with explicit need for both consuming and producing values. Specific cases include:

1. When you need the full Subject functionality (emit + receive) in the same place:

   - Services that manage complex state with bidirectional needs
   - Testing scenarios where you need to trigger events and observe outcomes

2. When implementing mediator patterns:

   - Components that both receive from and send to a central messaging system
   - Event bus implementations where components are both publishers and subscribers

3. When optimizing for very specific performance cases:

   - High-frequency event handling where the extra wrapper could impact performance
   - Memory-constrained environments (rare in modern applications)

## `first()` is necessary in async validators

Adding first() is necessary because of how Angular handles async validators. Here's why it works:

1. Observable Completion Requirement:
Angular's async validator system requires that the observable returned by an async validator must complete after emitting a value. Without completion, Angular won't update the form control's errors.
2. BehaviorSubject Issue:
Your auth service likely uses a BehaviorSubject for the users, which never naturally completes. When you subscribe to isUsernameExists(), you're getting an observable that emits values but doesn't complete on its own.
3. What first() Does:
   - Takes only the first emission from the source observable
   - Automatically completes the observable after that first emission
   - Ensures Angular receives a completed observable with a validation result
   -

Without first(), your observable would:

- Emit a value with the validation result
- Stay open waiting for more emissions (because BehaviorSubjects don't complete)
- Angular would see an incomplete observable and not update the validation state

## `Date.now()` vs `new Date().getTime()`

Both `new Date().getTime()` and `Date.now()` return the same value for the current timestamp in milliseconds since the epoch (January 1, 1970).

- Functionally identical results
- `Date.now()` is more efficient (no temporary Date object)
- `Date.now()` is more modern and preferred in most cases

## Options to unsubscribe from observables

1. Use first() or take(1) operator
For one-time subscriptions:

```typescript
this.authService.isUsernameExists(username).pipe(
  first() // Automatically completes after first emission
).subscribe(exists => {
  // Handle result
});
```

2. Store and unsubscribe in ngOnDestroy()

```typescript
private subscription: Subscription = new Subscription();

ngOnInit() {
  this.subscription.add(
    this.authService.users$.subscribe(users => {
      // Handle users
    })
  );
}

ngOnDestroy() {
  this.subscription.unsubscribe();
}
```

3. Use takeUntil with destroy subject ⭐

```typescript
private destroy$ = new Subject<void>();

ngOnInit() {
  this.authService.users$.pipe(
    takeUntil(this.destroy$)
  ).subscribe(users => {
    // Handle users
  });
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
```

4. Use async pipe in templates ⭐

```html
<div *ngFor="let user of users | async">
  {{ user.name }}
</div>
```

```typescript
// In your component
users$ = this.authService.users$;
```

5. For HTTP calls
HTTP observables automatically complete after emitting, so you generally don't need to unsubscribe

6. takeUntilDestroyed() (Angular 16+) ⭐
This is a modern, cleaner approach introduced in Angular 16 that doesn't require manual setup:

```typescript
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({...})
export class MyComponent {
  constructor() {
    this.authService.users$.pipe(
      takeUntilDestroyed() // Automatically handles unsubscription
    ).subscribe(users => {
      // Handle users
    });
  }
}
```

7. DestroyRef.onDestroy() (Angular 14+)
Using the DestroyRef injection directly:

```typescript
import { DestroyRef, inject } from '@angular/core';

@Component({...})
export class MyComponent {
  private destroyRef = inject(DestroyRef);
  
  ngOnInit() {
    const subscription = this.service.data$.subscribe();
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
```
