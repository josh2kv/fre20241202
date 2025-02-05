import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EMAIL_REGEX } from '@core/config';
import { ROUTE_PATHS } from '@core/config/routes';
import { EmailFormControls } from '@shared/interfaces/home';
import { createEmailValidator } from '@shared/validators/email.validator';
import { selectUser } from '@store/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  isAuthenticated$: Observable<boolean>;
  toBrowse = ROUTE_PATHS.BROWSE;
  toRegister = ROUTE_PATHS.AUTH_REGISTER;
  emailForm: FormGroup<EmailFormControls>;

  constructor(
    private fb: NonNullableFormBuilder,
    private router: Router,
    private store: Store
  ) {
    this.isAuthenticated$ = this.store
      .select(selectUser)
      .pipe(map((user) => !!user));
    this.emailForm = this.fb.group<EmailFormControls>({
      email: this.fb.control('', {
        validators: [Validators.required, Validators.pattern(EMAIL_REGEX)],

        asyncValidators: [createEmailValidator()],
        updateOn: 'blur',
      }),
    });
  }

  onSubmit() {
    if (this.emailForm.valid) {
      this.router.navigate([this.toRegister], {
        state: { email: this.emailForm.value.email },
      });
    }
  }

  get emailControl() {
    return this.emailForm.get('email');
  }
}
