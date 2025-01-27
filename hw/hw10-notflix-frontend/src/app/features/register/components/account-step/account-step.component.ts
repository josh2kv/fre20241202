import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TMDB_API_KEY_REGEX, USERNAME_MIN_LENGTH } from '@core/config';
import { USERNAME_MAX_LENGTH } from '@core/config';
import { ROUTE_PATHS, ROUTE_SEGMENTS } from '@core/config/routes';
import {
  AccountFormControls,
  CredentialFormValues,
  SignupValues,
} from '@shared/interfaces/auth';
import { createTmdbApiKeyValidator } from '@shared/validators/tmdb-api-key.validator';
@Component({
  selector: 'app-account-step',
  standalone: false,

  templateUrl: './account-step.component.html',
  styleUrl: './account-step.component.scss',
})
export class AccountStepComponent {
  accountForm: FormGroup<AccountFormControls>;
  signUpFormValues: SignupValues = {
    email: '',
    password: '',
    username: '',
    tmdbApiKey: '',
    plan: '',
  };

  constructor(
    private fb: NonNullableFormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.signUpFormValues.email = navigation?.extras?.state?.['email'] || '';
    this.signUpFormValues.password =
      navigation?.extras?.state?.['password'] || '';

    if (!this.signUpFormValues.email || !this.signUpFormValues.password) {
      this.router.navigate([`../${ROUTE_SEGMENTS.CREDENTIALS}`], {
        relativeTo: this.route,
      });
    }

    this.accountForm = this.fb.group<AccountFormControls>({
      username: this.fb.control('', [
        Validators.required,
        Validators.minLength(USERNAME_MIN_LENGTH),
        Validators.maxLength(USERNAME_MAX_LENGTH),
      ]),
      tmdbApiKey: this.fb.control('', {
        validators: [
          Validators.required,
          Validators.pattern(TMDB_API_KEY_REGEX),
        ],
        asyncValidators: [createTmdbApiKeyValidator()],
        updateOn: 'blur',
      }),
    });
  }

  onSubmit() {
    if (this.accountForm.valid) {
      this.router.navigate([`../${ROUTE_SEGMENTS.PLAN}`], {
        relativeTo: this.route,
        state: {
          ...this.signUpFormValues,
          ...this.accountForm.value,
        },
      });
    }
  }

  get usernameControl() {
    return this.accountForm.get('username');
  }

  get tmdbApiKeyControl() {
    return this.accountForm.get('tmdbApiKey');
  }
}
