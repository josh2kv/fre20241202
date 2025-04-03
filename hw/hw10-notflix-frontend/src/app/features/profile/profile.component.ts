import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  SNACKBAR_ERROR_CONFIG,
  SNACKBAR_SUCCESS_CONFIG,
  TMDB_API_KEY_REGEX,
} from '@core/config';
import { USERNAME_MAX_LENGTH } from '@core/config';
import { USERNAME_MIN_LENGTH } from '@core/config';
import { ROUTE_PATHS } from '@core/config/routes';
import { AuthStateService } from '@core/services/auth/auth-state.service';
import { AuthService } from '@core/services/auth/auth.service';
import { ProfileFormControls } from '@shared/interfaces/account';
import { Plan, PlanLabelMap } from '@shared/interfaces/auth';
import { enumValidator } from '@shared/validators/enum-validator';
import { createTmdbApiKeyValidator } from '@shared/validators/tmdb-api-key.validator';

@Component({
  selector: 'app-profile',
  standalone: false,

  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  profileForm!: FormGroup<ProfileFormControls>;
  plans = Object.entries(PlanLabelMap).map(([key, value]) => ({
    label: value,
    value: key,
  }));

  constructor(
    private fb: NonNullableFormBuilder,
    private authStateService: AuthStateService,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    const user = this.authStateService.getCurrentUser();
    if (!user) {
      this.router.navigate([ROUTE_PATHS.HOME]);
      return;
    }

    this.profileForm = this.fb.group<ProfileFormControls>({
      email: this.fb.control({
        value: user.email,
        disabled: true,
      }),
      password: this.fb.control('', [
        Validators.minLength(PASSWORD_MIN_LENGTH),
        Validators.maxLength(PASSWORD_MAX_LENGTH),
      ]),
      username: this.fb.control(user.username, [
        Validators.required,
        Validators.minLength(USERNAME_MIN_LENGTH),
        Validators.maxLength(USERNAME_MAX_LENGTH),
      ]),
      tmdbApiKey: this.fb.control(user.tmdbApiKey, {
        validators: [
          Validators.required,
          Validators.pattern(TMDB_API_KEY_REGEX),
        ],
        asyncValidators: [createTmdbApiKeyValidator()],
        updateOn: 'blur',
      }),
      plan: this.fb.control(user.plan, [
        Validators.required,
        enumValidator(Plan),
      ]),
    });
  }

  get usernameControl() {
    return this.profileForm.get('username');
  }

  get planControl() {
    return this.profileForm.get('plan');
  }

  get tmdbApiKeyControl() {
    return this.profileForm.get('tmdbApiKey');
  }

  get passwordControl() {
    return this.profileForm.get('password');
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.authService.updateProfile(this.profileForm.value).subscribe({
        next: () => {
          this.snackBar.open(
            '✅ Profile updated successfully!',
            'Close',
            SNACKBAR_SUCCESS_CONFIG
          );
        },
        error: () => {
          this.snackBar.open(
            '❌ Failed to update profile.',
            'Close',
            SNACKBAR_ERROR_CONFIG
          );
        },
      });
    }
  }
}
