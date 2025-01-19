import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
  PLATFORM_ID,
} from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTE_PATHS, ROUTE_SEGMENTS } from '@core/config/routes';
import { CredentialsFormControls } from '@shared/interfaces/auth';

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
      email: this.fb.control(email, [Validators.required, Validators.email]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(6),
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
}
