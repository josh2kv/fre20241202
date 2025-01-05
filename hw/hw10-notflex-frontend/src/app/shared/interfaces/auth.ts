import { FormControl } from '@angular/forms';

export interface CredentialsFormControls {
  email: FormControl<string>;
  password: FormControl<string>;
}

export interface AccountFormControls {
  username: FormControl<string>;
  apiKey: FormControl<string>;
}
