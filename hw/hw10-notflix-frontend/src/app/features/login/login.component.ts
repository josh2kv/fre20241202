import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTE_PATH } from '@core/config/routes';
import { LoginFormControls } from '@shared/interfaces/auth';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  toSignup = ROUTE_PATH.AUTH_REGISTER;
  loginForm: FormGroup<LoginFormControls>;

  constructor(private fb: NonNullableFormBuilder, private router: Router) {
    this.loginForm = this.fb.group<LoginFormControls>({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
      rememberMe: this.fb.control(false),
    });
  }

  onSubmit() {
    console.log('loginFormValues', this.loginForm.value);

    if (this.loginForm.valid) {
      this.router.navigate([`${ROUTE_PATH.BROWSE}`]);
    }
  }
}
