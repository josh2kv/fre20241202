import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { AuthService } from '@core/services/auth/auth.service';
import {
  Observable,
  map,
  catchError,
  of,
  debounceTime,
  first,
  last,
} from 'rxjs';
import { inject } from '@angular/core';

export function createTmdbApiKeyValidator(): AsyncValidatorFn {
  const authService = inject(AuthService);

  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return authService.checkIfTmdbApiKeyIsValid(control.value).pipe(
      debounceTime(300),
      map((isValid) => (isValid ? null : { tmdbApiKeyInvalid: true })),
      catchError(() => of(null)), // Returns null as the validation result if an error occurs. Prevents the validator from breaking if the API fails
      last() // Gets the most recent validation result. If user types quickly, only validates the final value
    );
  };
}
