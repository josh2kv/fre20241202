import { FormControl } from '@angular/forms';

export interface ContactFormControls {
  name: FormControl<string>;
  message: FormControl<string>;
}
