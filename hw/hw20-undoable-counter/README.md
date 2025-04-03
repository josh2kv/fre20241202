# Undoable Counter

## Requirements

- The count should begin at 0
- Clicking the +1, +10, +100 buttons should add 1, 10, and 100 to the count, respectively
- Clicking the -1, -10, -100 buttons should subtract 1, 10, and 100 from the count, respectively
- Clicking any + or - button should show a new entry in the history, in the format: ACTION (BEFORE -> AFTER) (e.g. +1 (0 -> 1))
- Clicking the 'Undo' button should undo the last action. For example, if the user just clicked '+10', clicking undo should subtract 10 from the
count
- The user should be able to undo up to the last 50 actions
- The 'Redo' button should be greyed out until the user clicks 'Undo'
- Clicking the 'Redo' button should redo the last action the user undid. For example, if the user clicked '+10', clicking undo would subtract 10, then clicking redo would add 10 again
- Clicking undo/redo should remove and re-add entries to the history respectively

## Observable Derived State in Angular: Properties vs. Observables

### For derived states from an Observable, why is making them as Observables too is better rather than using them as property variables?

1. **Change Detection Efficiency:**

   - When using property variables, Angular checks these properties on every change detection cycle, regardless of whether the underlying data changed
   - With derived Observables and async pipe, Angular only updates when actual data changes, resulting in more efficient rendering

2. **Memory Management:**

   - Property variables require manual subscription management, which can lead to memory leaks if subscriptions aren't properly cleaned up
   - The async pipe automatically handles subscription/unsubscription based on component lifecycle

3. **State Consistency:**

   - With property variables, there's a risk of inconsistent state if updates happen rapidly or asynchronously
   - Derived Observables ensure atomic updates and maintain synchronization with the source Observable

4. **Debugging and Testing:**

   - With property variables, the state transformation logic is hidden in subscription callbacks, making it harder to test
   - Derived Observables make transformations explicit and testable through RxJS operators

5. **Reactive Programming Paradigm:**
   - Property variables break the reactive chain, forcing a transition between reactive and imperative paradigms
   - Keeping everything as Observables maintains a consistent reactive programming model end-to-end

### Approach 1: Using Property Variables

```typescript
export class CounterComponent implements OnDestroy {
  // Main state
  private stateSubject = new BehaviorSubject<State>({...});
  
  // Derived property variables
  currentCount: number = 0;
  isUndoable: boolean = false;
  
  private subscription: Subscription;
  
  constructor() {
    this.subscription = this.stateSubject.subscribe(state => {
      this.currentCount = state.history[state.currentIndex]?.count ?? 0;
      this.isUndoable = state.currentIndex > 0;
    });
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
```

```html
<div>{{ currentCount }}</div>
<button [disabled]="!isUndoable">Undo</button>
```

### Approach 2: Using Derived Observables

```typescript
export class CounterComponent {
  // Main state
  private stateSubject = new BehaviorSubject<State>({...});
  
  // Derived observables
  currentCount$ = this.stateSubject.pipe(
    map(state => state.history[state.currentIndex]?.count ?? 0)
  );
  isUndoable$ = this.stateSubject.pipe(
    map(state => state.currentIndex > 0)
  );
}
```

```html
<div>{{ currentCount$ | async }}</div>
<button [disabled]="!(isUndoable$ | async)">Undo</button>
```

### Comparison

- Property Variables
✅ Simpler template syntax
✅ Easy to use in component methods
✅ Familiar to developers new to Angular
❌ Requires manual subscription management
❌ Less efficient for Angular change detection
❌ Risk of stale data if state updates aren't handled properly
- Derived Observables
✅ Best practice for reactive programming
✅ More efficient with Angular change detection
✅ No manual subscription management needed
✅ Single source of truth
❌ Template syntax more complex (needs async pipe)
❌ Steeper learning curve
❌ Harder to use values in methods

### When to Choose Each

- Use Property Variables when:
  - Working on small, simple components
  - The team is less familiar with RxJS
  - Component methods frequently need these values
  - Performance is not a critical concern
- Use Derived Observables when:
  - Building larger, more complex applications
  - Working with frequently changing state
  - Following reactive programming patterns
  - Working with a team familiar with RxJS
  - Optimal change detection is important

### Best Practice

Most Angular experts recommend the Observables approach as applications grow, as it scales better and follows Angular's reactive paradigm more closely.
