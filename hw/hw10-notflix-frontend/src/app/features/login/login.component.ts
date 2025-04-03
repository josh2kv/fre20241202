import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTE_PATHS } from '@core/config/routes';
import { AuthService } from '@core/services/auth/auth.service';
import {
  CredentialFormValues,
  LoginFormControls,
} from '@shared/interfaces/auth';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  toSignup = ROUTE_PATHS.AUTH_REGISTER;
  loginForm: FormGroup<LoginFormControls>;

  constructor(
    private fb: NonNullableFormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group<LoginFormControls>({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
      rememberMe: this.fb.control(false),
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) return;

    this.authService
      .login(this.loginForm.value as CredentialFormValues)
      .subscribe((res) => {
        this.router.navigate([`${ROUTE_PATHS.BROWSE}`]);
      });
  }
}
