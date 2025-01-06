import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTE_SEGMENT } from '@core/config/routes';
import { CredentialsFormControls } from '@shared/interfaces/auth';

@Component({
  selector: 'app-credentials-step',
  standalone: false,

  templateUrl: './credentials-step.component.html',
  styleUrl: './credentials-step.component.scss',
})
export class CredentialsStepComponent {
  credentialsForm: FormGroup<CredentialsFormControls>;

  constructor(
    private fb: NonNullableFormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.credentialsForm = this.fb.group<CredentialsFormControls>({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {
    console.log(this.credentialsForm.value);
    if (this.credentialsForm.valid) {
      this.router.navigate([`../${ROUTE_SEGMENT.ACCOUNT}`], {
        relativeTo: this.route,
      });
    }
  }
}
