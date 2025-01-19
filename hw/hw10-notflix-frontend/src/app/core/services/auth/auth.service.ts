import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATHS, ROUTE_PATHS } from '@core/config/routes';
import {
  CredentialFormValues,
  LoginFormControls,
  ResAuth,
  SignupValues,
} from '@shared/interfaces/auth';
import { ApiSuccessResponse } from '@shared/interfaces/common';
import { environment } from 'environments/environment';
import { AuthStateService } from './auth-state.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    private authStateService: AuthStateService
  ) {}

  register(signUpFormValues: SignupValues) {
    return this.http
      .post<ApiSuccessResponse<ResAuth>>(
        `${this.apiUrl + ROUTE_PATHS.AUTH_REGISTER}`,
        signUpFormValues
      )
      .pipe(
        tap((res) => {
          this.authStateService.setAuthState(
            res.data.accessToken,
            res.data.refreshToken,
            res.data.user
          );
        })
      );
  }

  login(loginFormValues: CredentialFormValues) {
    return this.http
      .post<ApiSuccessResponse<ResAuth>>(
        `${this.apiUrl + ROUTE_PATHS.AUTH_LOGIN}`,
        loginFormValues
      )
      .pipe(
        tap((res) => {
          this.authStateService.setAuthState(
            res.data.accessToken,
            res.data.refreshToken,
            res.data.user
          );
        })
      );
  }

  refreshToken() {
    return this.http
      .post<ApiSuccessResponse<ResAuth>>(
        `${this.apiUrl + API_PATHS.AUTH_REFRESH}`,
        {
          refreshToken: this.authStateService.getRefreshToken(),
        }
      )
      .pipe(
        tap((res) => {
          this.authStateService.setAuthState(
            res.data.accessToken,
            res.data.refreshToken,
            res.data.user
          );
        })
      );
  }
}
