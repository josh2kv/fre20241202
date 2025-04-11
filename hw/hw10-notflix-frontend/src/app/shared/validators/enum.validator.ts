import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function enumValidator<T extends Record<string, string | number>>(
  enumType: T
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = Object.values(enumType).includes(control.value);
    return isValid ? null : { invalidEnum: { value: control.value } };
  };
}
