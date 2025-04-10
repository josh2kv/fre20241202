# Hw22TodoListWithStandalone

## Table of Contents

- [Angular 14 to 19: Key Changes](#angular-14-to-19-key-changes)
- [Standalone Components vs. NgModules](#standalone-components-vs-ngmodules)
- [Signals](#signals)
- [New Control Flow Syntax](#new-control-flow-syntax)
- [Modern Application Structure](#modern-application-structure)

## Angular 14 to 19: Key Changes

### Angular 14 (2022)

- Strictly typed forms with type safety
- Standalone components (preview)
- CLI auto-completion
- Angular DevTools improvements

### Angular 15 (2022)

- **Stable standalone components API**
- Directive composition API
- `NgOptimizedImage` directive for image optimization
- Functional router guards

### Angular 16 (2023)

- Server-side rendering (SSR) improvements
- Signals API (developer preview)
- Self-closing tags in templates
- Required inputs
- Standalone API graduated from developer preview

### Angular 17 (2023)

- New application builder (`@angular/vite-plugin`)
- Improved SSR via hydration
- New control flow syntax (`@if`, `@for`, etc.)
- Deferred loading with `@defer`
- Standalone-based projects by default

### Angular 18 (2024)

- **Signals API stabilized**
- Non-destructive hydration
- New built-in Angular directives (`@let`, `@if`, `@switch`)
- Signal-based forms API (preview)
- Server-side rendering enhancements

### Angular 19 (2024)

- New routing API with type-safety for route parameters
- Signal inputs
- New reactive primitives like `observe()` and `effect()`
- Enhanced build performance
- Element composition API (preview)

## Standalone Components vs. NgModules

### Traditional NgModule Approach

You needed to declare components in NgModules:

```typescript
// hero.component.ts
@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html'
})
export class HeroComponent {
  // Component logic
}

// heroes.module.ts
@NgModule({
  declarations: [HeroComponent],
  imports: [CommonModule],
  exports: [HeroComponent]
})
export class HeroesModule {}

// app.module.ts
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HeroesModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

### Standalone Components Approach (Angular 15+)

Standalone components don't require modules:

```typescript
// hero.component.ts
@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  standalone: true,
  imports: [CommonModule] // Import dependencies directly
})
export class HeroComponent {
  // Component logic
}

// main.ts (bootstrapping)
bootstrapApplication(AppComponent, {
  providers: [
    // App-wide providers here
  ]
});
```

### Key Differences

1. **Dependency Management:**
   - Old: Centralized in modules, requiring knowledge of module structure
   - New: Each component declares its own dependencies
2. **Application Startup:**
   - Old: Bootstrap through `AppModule`
   - New: Direct bootstrapping with `bootstrapApplication()`
3. **Sharing Components:**
   - Old: Export from module, import module elsewhere
   - New: Import component directly where needed
4. **Testing:**
   - Old: Create `TestBed` with module imports
   - New: Simpler setup with direct component testing
5. **Lazy Loading:**
   - Old: Configure in routes with `loadChildren`
   - New: Use `loadComponent` or direct import with dynamic imports

## Signals

### Traditional State Management

You typically managed state with RxJS:

```typescript
// user.service.ts
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  updateUser(user: User) {
    this.userSubject.next(user);
  }
}

// component.ts
@Component({...})
export class UserComponent implements OnInit, OnDestroy {
  user: User | null = null;
  private subscription: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.subscription = this.userService.user$.subscribe(user => {
      this.user = user;
      // Handle side effects
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); // Cleanup required
  }
}
```

### Signal-Based Approach (Angular 18+)

Signals provide a simpler reactive programming model:

```typescript
// user.service.ts
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSignal = signal<User | null>(null);
  user = this.userSignal.asReadonly();

  updateUser(user: User) {
    this.userSignal.set(user);
  }
}

// component.ts
@Component({
  standalone: true,
  template: `
    <div *ngIf="userService.user()">
      {{ userService.user()?.name }}
    </div>
  `
})
export class UserComponent {
  constructor(public userService: UserService) {}
  
  // No subscription management needed!
}
```

### Key Differences

1. **Simplicity**:
   - Old: Complex subscription lifecycle management
   - New: Automatic dependency tracking with no manual subscriptions
2. **Performance**:
   - Old: Change detection runs on all possible changes
   - New: Fine-grained updates only when signals change
3. **Derived State**:
   - Old: Use pipe operators, map, combineLatest
   - New: Use computed() for derived values
4. **Side Effects**:
   - Old: Handle in subscription callbacks
   - New: Use effect() for automatic cleanup
5. **Integration with Templates**:
   - Old: AsyncPipe required for Observable unwrapping
   - New: Direct signal access in templates with ()

### Benefits of Signals

1. Less boilerplate code
2. No memory leaks from forgotten unsubscribes
3. Better performance with fine-grained updates
4. More intuitive reactive programming model
5. Easier testing

## New Control Flow Syntax

### Traditional Template Directives

You used structural directives with asterisk () prefix:

```html
<!-- Old: *ngIf -->
<div *ngIf="user; else noUser">
  Welcome, {{ user.name }}!
</div>
<ng-template #noUser>
  Please log in.
</ng-template>

<!-- Old: *ngFor -->
<ul>
  <li *ngFor="let item of items; index as i; trackBy: trackById">
    {{ i + 1 }}. {{ item.name }}
  </li>
</ul>

<!-- Old: *ngSwitch -->
<div [ngSwitch]="status">
  <p *ngSwitchCase="'active'">Active user</p>
  <p *ngSwitchCase="'inactive'">Inactive user</p>
  <p *ngSwitchDefault>Unknown status</p>
</div>
```

### New Control Flow Syntax (Angular 17+)

Angular 17 introduced block-based control flow syntax:

```html
<!-- New: @if -->
@if (user) {
  <div>Welcome, {{ user.name }}!</div>
} @else {
  <div>Please log in.</div>
}

<!-- New: @for -->
<ul>
  @for (item of items; track item.id; let i = $index) {
    <li>{{ i + 1 }}. {{ item.name }}</li>
  } @empty {
    <li>No items found</li>
  }
</ul>

<!-- New: @switch -->
@switch (status) {
  @case ('active') {
    <p>Active user</p>
  }
  @case ('inactive') {
    <p>Inactive user</p>
  }
  @default {
    <p>Unknown status</p>
  }
}
```

### Key Improvements

1. **Explicit Blocks**:
   - Old: Implicit template fragments were harder to visualize
   - New: Explicit blocks with braces make the structure clearer
2. **Better Type Checking**:
   - Old: Limited type inference in templates
   - New: Improved type checking and error messages
3. **New Features**:
   - `@empty` block for `@for` when collections are empty
   - Simpler tracking with automatic tracking expressions
4. **Deferred Loading**:
   - The new `@defer` block lets you lazy-load parts of the template:

      ```html
      @defer {
        <heavy-component></heavy-component>
      } @placeholder {
        <p>Loading...</p>
      } @loading {
        <spinner></spinner>
      }
      ```

5. **`@let` Blocks**:
   - Create local template variables:

      ```html
      @let fullName = firstName + ' ' + lastName
      <h2>Hello, {{ fullName }}</h2>
      ```

6. **Performance Benefits**:
   - Smaller runtime bundle (no directive overhead)
   - Better change detection
   - Improved rendering performance

## Modern Application Structure

### Traditional App Structure

Application structure relied heavily on NgModules:

```typescript
// app-routing.module.ts
const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

// users.module.ts
@NgModule({
  declarations: [UserListComponent, UserDetailComponent],
  imports: [CommonModule, UsersRoutingModule]
})
export class UsersModule {}
```

### Modern Standalone Structure

It enables a more direct approach with standalone components:

```typescript
// app.routes.ts
export const appRoutes: Routes = [
  {
    path: 'users',
    loadComponent: () => import('./users/user-list.component')
      .then(m => m.UserListComponent)
  },
  {
    path: 'users/:id',
    loadComponent: () => import('./users/user-detail.component')
      .then(m => m.UserDetailComponent)
  }
];

// main.ts
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(),
    provideAnimations()
  ]
});
```

### Key Differences

1. **Bootstrapping**:
   - Old: Bootstrap via `NgModule`
   - New: Direct component bootstrapping with provider configuration
2. **Lazy Loading**:
   - Old: `loadChildren` to load entire modules
   - New: `loadComponent` for single components or `loadChildren` for route grouping
3. **Provider Registration**:
   - Old: Module providers and `forRoot/forChild` patterns
   - New: Streamlined provider functions like `provideRouter()`, `provideHttpClient()`
4. **Feature Organization**:
   - Old: Features grouped by modules
   - New: Features grouped by routes or functional areas
5. **Route Typing**:
   - Angular 19 introduced enhanced type-checking for routes:

      ```typescript
      // Type-safe route params
      const routes = [{
        path: 'users/:id',
        component: UserDetailComponent
      }] as const; // 'as const' enables strict typing

      // In component
      export class UserDetailComponent {
        user = inject(ActivatedRoute).params.pipe(
          map(params => params['id']) // Now properly typed as string
        );
      }
      ```

### Dependency Injection Improvements

```typescript
// Service with injection
@Injectable({providedIn: 'root'})
export class LoggerService {
  // Functional injection pattern
  private http = inject(HttpClient);
  
  log(message: string) {
    this.http.post('/api/logs', { message });
  }
}

// Component with inject function
@Component({
  standalone: true,
  // ...
})
export class UserComponent {
  private userService = inject(UserService);
  private logger = inject(LoggerService);
  
  // Use services directly
}
```

### Best Practices for Modern Angular

1. **Self-contained features**:
   - Group by feature rather than technical role
   - Each feature should control its own routes and components
2. **Flat project structure**:
   - Fewer nested modules
   - More direct component relationships
3. **Component-centric architecture**:
   - Build features around standalone components
   - Use component composition over inheritance
4. **Targeted provider scope**:
   - Provide services exactly where needed using the component's providers array
   - Use environment injectors for shared services

The modern Angular approach yields cleaner code, better performance through improved tree-shaking, and a more intuitive development experience.
