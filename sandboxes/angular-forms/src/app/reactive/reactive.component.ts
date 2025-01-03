import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface ContactFormValues {
  name: string;
  email: string;
}

@Component({
  selector: 'app-reactive',
  standalone: false,

  templateUrl: './reactive.component.html',
  styleUrl: './reactive.component.scss',
})
export class ReactiveComponent implements OnInit {
  contactForm: FormGroup;

  @Input() formValues: ContactFormValues | null = null;
  @Output() formSubmit = new EventEmitter<ContactFormValues>();

  constructor(private fb: FormBuilder) {
    console.log('constructor', this.formValues);
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    console.log('onInit', this.formValues);
    if (this.formValues) {
      this.contactForm.patchValue(this.formValues);
    }
  }

  onSubmit() {
    console.log('onSubmit', this.contactForm.value);
    this.formSubmit.emit(this.contactForm.value);
  }
}
