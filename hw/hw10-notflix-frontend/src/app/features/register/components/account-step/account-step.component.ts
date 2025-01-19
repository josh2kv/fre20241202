import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTE_PATHS, ROUTE_SEGMENTS } from '@core/config/routes';
import {
  AccountFormControls,
  CredentialFormValues,
  SignupValues,
} from '@shared/interfaces/auth';
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
    console.log('signUpFormValues', this.signUpFormValues);
    if (!this.signUpFormValues.email || !this.signUpFormValues.password) {
      this.router.navigate([`../${ROUTE_SEGMENTS.CREDENTIALS}`], {
        relativeTo: this.route,
      });
    }

    this.accountForm = this.fb.group<AccountFormControls>({
      username: this.fb.control('', [Validators.required]),
      tmdbApiKey: this.fb.control('', [Validators.required]),
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
}
