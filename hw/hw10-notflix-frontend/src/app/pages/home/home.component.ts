import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTE_PATHS } from '@core/config/routes';
import { EmailFormControls } from '@shared/interfaces/home';

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  toRegister = ROUTE_PATHS.AUTH_REGISTER;
  emailForm: FormGroup<EmailFormControls>;

  constructor(private fb: NonNullableFormBuilder, private router: Router) {
    this.emailForm = this.fb.group<EmailFormControls>({
      email: this.fb.control('', [Validators.required, Validators.email]),
    });
  }

  onSubmit() {
    console.log('emailFormValues', this.emailForm.value);
    if (this.emailForm.valid) {
      this.router.navigate([this.toRegister], {
        state: this.emailForm.value,
      });
    }
  }
}
