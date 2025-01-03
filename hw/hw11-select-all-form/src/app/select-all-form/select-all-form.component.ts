import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
} from '@angular/forms';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';

export interface SelectAllFormValues {
  items: boolean[];
}

// NOTE: `NonNullableFormBuilder` will not allow null values
// so we can use `FormControl<string[]>` instead of `FormControl<string[] | null>`
interface SelectAllFormControls {
  items: FormArray<FormControl<boolean>>;
}

@Component({
  selector: 'app-select-all-form',
  standalone: false,

  templateUrl: './select-all-form.component.html',
  styleUrl: './select-all-form.component.scss',
})
export class SelectAllFormComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  selectAllForm: FormGroup<SelectAllFormControls>;

  @Input() initialFormValues: SelectAllFormValues | null = null;
  @Input() checkboxItems: string[] = [];
  @Output() formSubmit = new EventEmitter<SelectAllFormValues>();

  constructor(private fb: NonNullableFormBuilder) {
    // NOTE: Empty array created, but can't add controls yet
    this.selectAllForm = this.fb.group<SelectAllFormControls>({
      items: this.fb.array<boolean>([]),
    });
  }

  ngOnInit(): void {
    // NOTE: Now checkboxItems is available, so we can create controls
    const itemsArray = this.selectAllForm.get('items') as FormArray<
      FormControl<boolean>
    >;

    // Clear any existing controls
    while (itemsArray.length) {
      itemsArray.removeAt(0);
    }

    // Add a FormControl for each checkbox item
    this.checkboxItems.forEach(() => {
      itemsArray.push(this.fb.control(false));
    });

    if (this.initialFormValues) {
      this.selectAllForm.setValue(this.initialFormValues);
    }

    this.selectAllForm.valueChanges
      .pipe(takeUntil(this.destroy$), distinctUntilChanged())
      .subscribe((value) => {
        console.log('Form value changed:', value);
        this.onSubmit();
      });
  }

  // NOTE: Unsubscribe from the form value changes when the component is destroyed
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get moviesValue() {
    return this.selectAllForm.get('movies')?.value || [];
  }

  onSubmit() {
    console.log(this.selectAllForm.value);
    this.formSubmit.emit(this.selectAllForm.value as SelectAllFormValues);
  }
}
