import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  EMAIL_REGEX,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from '@core/config';
import { ROUTE_SEGMENTS } from '@core/config/routes';
import { CredentialsFormControls } from '@shared/interfaces/auth';
import { createEmailValidator } from '@shared/validators/email.validator';

@Component({
  selector: 'app-credentials-step',
  standalone: false,

  templateUrl: './credentials-step.component.html',
  styleUrl: './credentials-step.component.scss',
})
export class CredentialsStepComponent {
  private platformId = inject(PLATFORM_ID);
  credentialsForm: FormGroup<CredentialsFormControls>;

  constructor(
    private fb: NonNullableFormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const navigation = this.router.getCurrentNavigation();
    let email = navigation?.extras?.state?.['email'] || '';
    if (isPlatformBrowser(this.platformId) && !email) {
      email = window.history?.state?.['email'] || '';
    }

    this.credentialsForm = this.fb.group<CredentialsFormControls>({
      email: this.fb.control(email, {
        validators: [Validators.required, Validators.pattern(EMAIL_REGEX)],
        asyncValidators: [createEmailValidator()],
        updateOn: 'blur',
      }),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(PASSWORD_MIN_LENGTH),
        Validators.maxLength(PASSWORD_MAX_LENGTH),
      ]),
    });
  }

  onSubmit() {
    if (this.credentialsForm.valid) {
      this.router.navigate([`../${ROUTE_SEGMENTS.ACCOUNT}`], {
        relativeTo: this.route,
        state: {
          ...this.credentialsForm.value,
        },
      });
    }
  }

  get emailControl() {
    return this.credentialsForm.get('email');
  }

  get passwordControl() {
    return this.credentialsForm.get('password');
  }
}
