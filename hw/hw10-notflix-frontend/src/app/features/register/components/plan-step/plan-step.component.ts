import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTE_PATHS, ROUTE_SEGMENTS } from '@core/config/routes';
import { AuthService } from '@core/services/auth/auth.service';
import {
  Plan,
  PlanDetails,
  PlanFormControls,
  SignupValues,
} from '@shared/interfaces/auth';
@Component({
  selector: 'app-plan-step',
  standalone: false,

  templateUrl: './plan-step.component.html',
  styleUrl: './plan-step.component.scss',
})
export class PlanStepComponent {
  signUpFormValues: SignupValues = {
    email: '',
    password: '',
    username: '',
    tmdbApiKey: '',
    plan: '',
  };
  planForm: FormGroup<PlanFormControls>;
  plans: PlanDetails[] = [
    {
      id: Plan.STANDARD_WITH_ADS,
      name: 'Standard with ads',
      resolution: '1080p',
      features: {
        monthlyPrice: 6.99,
        videoQuality: 'Good',
        resolution: '1080p (Full HD)',
        supportedDevices: 'TV, computer, mobile phone, tablet',
        simultaneousStreams: 2,
        downloadDevices: 2,
        ads: 'Less than you might think',
      },
    },
    {
      id: Plan.STANDARD,
      name: 'Standard',
      resolution: '1080p',
      features: {
        monthlyPrice: 15.49,
        videoQuality: 'Good',
        resolution: '1080p (Full HD)',
        supportedDevices: 'TV, computer, mobile phone, tablet',
        simultaneousStreams: 2,
        downloadDevices: 2,
        ads: 'No ads',
      },
    },
    {
      id: Plan.PREMIUM,
      name: 'Premium',
      resolution: '4K + HDR',
      features: {
        monthlyPrice: 22.99,
        videoQuality: 'Best',
        resolution: '4K (Ultra HD) + HDR',
        spatialAudio: 'Included',
        supportedDevices: 'TV, computer, mobile phone, tablet',
        simultaneousStreams: 4,
        downloadDevices: 6,
        ads: 'No ads',
      },
    },
  ];

  constructor(
    private fb: NonNullableFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.signUpFormValues.email = navigation?.extras?.state?.['email'] || '';
    this.signUpFormValues.password =
      navigation?.extras?.state?.['password'] || '';
    this.signUpFormValues.username =
      navigation?.extras?.state?.['username'] || '';
    this.signUpFormValues.tmdbApiKey =
      navigation?.extras?.state?.['tmdbApiKey'] || '';

    if (
      !this.signUpFormValues.email ||
      !this.signUpFormValues.password ||
      !this.signUpFormValues.username ||
      !this.signUpFormValues.tmdbApiKey
    ) {
      this.router.navigate([`../${ROUTE_SEGMENTS.CREDENTIALS}`], {
        relativeTo: this.route,
      });
    }

    this.planForm = this.fb.group<PlanFormControls>({
      plan: this.fb.control('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.planForm.valid) {
      this.authService
        .register({
          ...this.signUpFormValues,
          plan: this.planForm.value.plan || '',
        })
        .subscribe((res) => {
          this.router.navigate([`${ROUTE_PATHS.BROWSE}`]);
        });
    }
  }
}
