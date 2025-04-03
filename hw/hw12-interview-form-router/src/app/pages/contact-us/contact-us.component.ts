import { ContactFormControls } from '@/shared/interfaces/contact-us';
import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  standalone: false,

  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent {
  contactForm: FormGroup<ContactFormControls>;
  submitted = false;

  constructor(private fb: NonNullableFormBuilder) {
    this.contactForm = this.fb.group<ContactFormControls>({
      name: this.fb.control('', [Validators.required]),
      message: this.fb.control('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  get name() {
    return this.contactForm.get('name');
  }

  get message() {
    return this.contactForm.get('message');
  }

  onSubmit() {
    console.log(this.contactForm.errors);
    console.log(this.contactForm.get('name')?.hasError('required'));
    console.log(this.contactForm.value);
    this.submitted = true;
  }
}
