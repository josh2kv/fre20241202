import {
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { catchError, debounceTime, first } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export function noUserExistsValidator(): AsyncValidatorFn {
  const authService = inject(AuthService);

  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return authService.isUsernameExists(control.value).pipe(
      debounceTime(600),
      map((isExists) => (isExists ? null : { noUserExists: true })),
      first(), // Ensure the observable completes
      catchError(() => {
        console.error('Error in username validation');
        return of(null);
      })
    );
  };
}
