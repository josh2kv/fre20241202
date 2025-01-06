import { FormControl } from '@angular/forms';

export interface CredentialsFormControls {
  email: FormControl<string>;
  password: FormControl<string>;
}

export interface AccountFormControls {
  username: FormControl<string>;
  apiKey: FormControl<string>;
}

export interface PlanFormControls {
  selectedPlan: FormControl<string>;
}

export interface Plan {
  id: string;
  name: string;
  resolution: string;
  features: {
    monthlyPrice: number;
    videoQuality: string;
    resolution: string;
    spatialAudio?: string;
    supportedDevices: string;
    simultaneousStreams: number;
    downloadDevices: number;
    ads: string;
  };
}
