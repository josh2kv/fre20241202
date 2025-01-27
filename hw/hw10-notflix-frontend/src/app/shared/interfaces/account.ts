import { FormControl } from '@angular/forms';

export interface ProfileFormControls {
  email: FormControl<string>;
  password: FormControl<string>;
  username: FormControl<string>;
  tmdbApiKey: FormControl<string>;
  plan: FormControl<string>;
}

export interface ProfileFormValues {
  email?: string;
  password?: string;
  username?: string;
  tmdbApiKey?: string;
  plan?: string;
}
