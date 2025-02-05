import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATH_SEGMENTS, API_PATHS, ROUTE_PATHS } from '@core/config/routes';
import {
  CredentialFormValues,
  ResAuth,
  SignupValues,
  User,
} from '@shared/interfaces/auth';
import { ApiSuccessResponse } from '@shared/interfaces/common';
import { environment } from 'environments/environment';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { ProfileFormValues } from '@shared/interfaces/account';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SNACKBAR_ERROR_CONFIG, SNACKBAR_SUCCESS_CONFIG } from '@core/config';
import { Store } from '@ngrx/store';
import * as AuthActions from '@store/auth/auth.actions';
import {
  selectRefreshToken,
  selectAccessToken,
} from '@store/auth/auth.selectors';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    private store: Store,
    private snackBar: MatSnackBar
  ) {}

  register(signUpFormValues: SignupValues) {
    return this.http
      .post<ApiSuccessResponse<ResAuth>>(
        `${this.apiUrl + ROUTE_PATHS.AUTH_REGISTER}`,
        signUpFormValues
      )
      .pipe(
        tap((res) => {
          this.store.dispatch(
            AuthActions.setAuthState({
              accessToken: res.data.accessToken,
              refreshToken: res.data.refreshToken,
              user: res.data.user,
            })
          );
        })
      );
  }

  checkIfEmailExists(email: string): Observable<boolean> {
    return this.http
      .get<ApiSuccessResponse<boolean>>(
        `${
          this.apiUrl +
          API_PATHS.AUTH_CHECK_EMAIL.replace(
            API_PATH_SEGMENTS.DYNAMIC_PARAM.EMAIL,
            email
          )
        }`
      )
      .pipe(map((res) => res.data));
  }

  checkIfTmdbApiKeyIsValid(tmdbApiKey: string): Observable<boolean> {
    return this.http
      .get<ApiSuccessResponse<boolean>>(
        `${
          this.apiUrl +
          API_PATHS.AUTH_CHECK_TMDB_API_KEY.replace(
            API_PATH_SEGMENTS.DYNAMIC_PARAM.TMDB_API_KEY,
            tmdbApiKey
          )
        }`
      )
      .pipe(map((res) => res.data));
  }

  login(loginFormValues: CredentialFormValues) {
    return this.http
      .post<ApiSuccessResponse<ResAuth>>(
        `${this.apiUrl + ROUTE_PATHS.AUTH_LOGIN}`,
        loginFormValues
      )
      .pipe(
        tap((res) => {
          this.store.dispatch(
            AuthActions.setAuthState({
              accessToken: res.data.accessToken,
              refreshToken: res.data.refreshToken,
              user: res.data.user,
            })
          );
        })
      );
  }

  refreshToken() {
    return this.http
      .post<ApiSuccessResponse<ResAuth>>(
        `${this.apiUrl + API_PATHS.AUTH_REFRESH}`,
        {
          refreshToken: this.store.select(selectRefreshToken),
        }
      )
      .pipe(
        tap((res) => {
          this.store.dispatch(
            AuthActions.setAuthState({
              accessToken: res.data.accessToken,
              refreshToken: res.data.refreshToken,
              user: res.data.user,
            })
          );
        })
      );
  }

  logout() {
    return this.http.post<ApiSuccessResponse<ResAuth>>(
      `${this.apiUrl + API_PATHS.AUTH_LOGOUT}`,
      { refreshToken: this.store.select(selectRefreshToken) }
    );
  }

  updateProfile({ email, password, ...rest }: ProfileFormValues) {
    const body = {
      ...rest,
      ...(password ? { password } : {}),
    };

    return this.http
      .patch<ApiSuccessResponse<User>>(
        `${this.apiUrl + API_PATHS.ACCOUNT_PROFILE}`,
        body
      )
      .pipe(
        tap((res) => {
          this.store.dispatch(
            AuthActions.updateProfileSuccess({ user: res.data })
          );
        })
      );
  }
}
