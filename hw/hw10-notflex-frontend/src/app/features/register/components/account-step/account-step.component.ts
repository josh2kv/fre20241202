import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTE_SEGMENT } from '@core/config/routes';
import {
  AccountFormControls,
  CredentialsFormControls,
} from '@shared/interfaces/auth';
@Component({
  selector: 'app-account-step',
  standalone: false,

  templateUrl: './account-step.component.html',
  styleUrl: './account-step.component.scss',
})
export class AccountStepComponent {
  accountForm: FormGroup<AccountFormControls>;

  constructor(
    private fb: NonNullableFormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.accountForm = this.fb.group<AccountFormControls>({
      username: this.fb.control('', [Validators.required]),
      apiKey: this.fb.control('', [Validators.required]),
    });
  }

  onSubmit() {
    console.log(this.accountForm.value);
    if (this.accountForm.valid) {
      this.router.navigate([`../${ROUTE_SEGMENT.PLAN}`], {
        relativeTo: this.route,
      });
    }
  }
}
