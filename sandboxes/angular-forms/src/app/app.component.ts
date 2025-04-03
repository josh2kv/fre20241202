import { Component } from '@angular/core';
import { ContactFormValues } from './reactive/reactive.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-forms';
  initialFormValues: ContactFormValues = {
    name: 'John Doe',
    email: 'john@example.com',
  };
  submittedFormValues: ContactFormValues | null = null;

  onFormSubmitted(formValues: ContactFormValues) {
    this.submittedFormValues = formValues;
  }
}
