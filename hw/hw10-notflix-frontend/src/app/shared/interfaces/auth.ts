import { FormControl } from '@angular/forms';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  tmdbApiKey: string;
  plan: Plan;
}

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum Plan {
  STANDARD_WITH_ADS = 'STANDARD_WITH_ADS',
  STANDARD = 'STANDARD',
  PREMIUM = 'PREMIUM',
}

export interface ResAuth {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export type LoginFormControls = {
  rememberMe: FormControl<boolean>;
} & CredentialsFormControls;

export interface SignupValues {
  email: string;
  password: string;
  username: string;
  tmdbApiKey: string;
  plan: string;
}

export interface CredentialFormValues {
  email: string;
  password: string;
}

export interface AccountFormValues {
  username: string;
  tmdbKey: string;
}

export interface PaymentFormValues {
  plan: string;
}

export interface CredentialsFormControls {
  email: FormControl<string>;
  password: FormControl<string>;
}

export interface AccountFormControls {
  username: FormControl<string>;
  tmdbApiKey: FormControl<string>;
}

export interface PlanFormControls {
  plan: FormControl<string>;
}

export interface PlanDetails {
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
