import { FormControl } from '@angular/forms';

export interface CredentialsFormControls {
  email: FormControl<string>;
  password: FormControl<string>;
}
