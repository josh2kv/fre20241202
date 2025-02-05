import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '@core/services/auth/auth.service';
import * as AuthActions from './auth.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ROUTE_PATHS } from '@core/config/routes';

@Injectable()
export class AuthEffects {
  // NOTE: injecting via constructor throws an error
  // https://github.com/ngrx/platform/issues/3654
  actions$ = inject(Actions);
  authService = inject(AuthService);
  router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map((res) =>
            AuthActions.loginSuccess({
              user: res.data.user,
              accessToken: res.data.accessToken,
              refreshToken: res.data.refreshToken,
            })
          ),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => {
          console.log('loginSuccess');
          this.router.navigate([`${ROUTE_PATHS.BROWSE}`]);
        })
      ),
    { dispatch: false }
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap(({ signUpFormValues }) =>
        this.authService.register(signUpFormValues).pipe(
          map((res) =>
            AuthActions.registerSuccess({
              user: res.data.user,
              accessToken: res.data.accessToken,
              refreshToken: res.data.refreshToken,
            })
          ),
          catchError((error) => of(AuthActions.registerFailure({ error })))
        )
      )
    )
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerSuccess),
        tap(() => this.router.navigate([`${ROUTE_PATHS.BROWSE}`]))
      ),
    { dispatch: false }
  );

  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.updateProfile),
      switchMap(({ profileFormValues }) =>
        this.authService.updateProfile(profileFormValues).pipe(
          map((res) => AuthActions.updateProfileSuccess({ user: res.data })),
          catchError((error) => of(AuthActions.updateProfileFailure({ error })))
        )
      )
    )
  );
}
