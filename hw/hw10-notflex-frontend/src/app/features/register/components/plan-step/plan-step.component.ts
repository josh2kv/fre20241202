import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTE_PATH } from '@core/config/routes';
import { Plan, PlanFormControls } from '@shared/interfaces/auth';
@Component({
  selector: 'app-plan-step',
  standalone: false,

  templateUrl: './plan-step.component.html',
  styleUrl: './plan-step.component.scss',
})
export class PlanStepComponent {
  planForm: FormGroup<PlanFormControls>;
  plans: Plan[] = [
    {
      id: '1',
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
      id: '2',
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
      id: '3',
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
    private route: ActivatedRoute
  ) {
    this.planForm = this.fb.group<PlanFormControls>({
      selectedPlan: this.fb.control('', [Validators.required]),
    });
  }

  onSubmit() {
    console.log(this.planForm.value);
    if (this.planForm.valid) {
      this.router.navigate([ROUTE_PATH.BROWSE]);
    }
  }
}
