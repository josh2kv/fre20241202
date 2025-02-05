import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ROUTE_PATHS } from '@core/config/routes';
import {
  CredentialFormValues,
  LoginFormControls,
} from '@shared/interfaces/auth';
import { Store } from '@ngrx/store';
import * as AuthActions from '@store/auth/auth.actions';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  toSignup = ROUTE_PATHS.AUTH_REGISTER;
  loginForm: FormGroup<LoginFormControls>;

  constructor(private fb: NonNullableFormBuilder, private store: Store) {
    this.loginForm = this.fb.group<LoginFormControls>({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
      rememberMe: this.fb.control(false),
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) return;

    this.store.dispatch(
      AuthActions.login({
        credentials: this.loginForm.value as CredentialFormValues,
      })
    );
  }
}
