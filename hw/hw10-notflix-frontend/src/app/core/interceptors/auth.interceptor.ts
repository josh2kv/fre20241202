import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { AuthService } from '@services/auth/auth.service';
import { API_PATHS } from '@core/config/routes';
import { selectAccessToken } from '@store/auth/auth.selectors';
import { Store } from '@ngrx/store';
import * as AuthActions from '@store/auth/auth.actions';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private publicRoutes = [API_PATHS.AUTH];

  constructor(private authService: AuthService, private store: Store) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.publicRoutes.some((route) => request.url.startsWith(route)))
      return next.handle(request);

    return this.store.select(selectAccessToken).pipe(
      take(1),
      switchMap((token) => {
        if (token) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
        }

        return next.handle(request).pipe(
          catchError((error: HttpErrorResponse) => {
            if (
              error.status === 401 &&
              !request.url.includes(API_PATHS.AUTH_REFRESH)
            ) {
              return this.handle401Error(request, next);
            }
            return throwError(() => error);
          })
        );
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      return this.authService.refreshToken().pipe(
        switchMap((response) => {
          this.isRefreshing = false;
          return next.handle(this.addToken(request, response.data.accessToken));
        }),
        catchError((error) => {
          this.isRefreshing = false;
          this.store.dispatch(AuthActions.clearAuthState());
          return throwError(() => error);
        })
      );
    }
    return next.handle(request);
  }
}
