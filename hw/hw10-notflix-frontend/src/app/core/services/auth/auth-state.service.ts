import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '@shared/interfaces/auth';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { ROUTE_PATHS } from '@core/config/routes';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private platformId = inject(PLATFORM_ID);
  private readonly ACCESS_TOKEN_KEY = 'accessToken';
  private readonly REFRESH_TOKEN_KEY = 'refreshToken';
  private readonly USER_KEY = 'user';

  private userSubject = new BehaviorSubject<User | null>(this.getStoredUser());
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(
    !!this.getAccessToken()
  );

  user$ = this.userSubject.asObservable();
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private router: Router) {
    this.isAuthenticated$.subscribe((isAuthenticated) => {
      if (!isAuthenticated) {
        this.router.navigate([ROUTE_PATHS.HOME]);
      }
    });
  }

  setAuthState(accessToken: string, refreshToken: string, user: User) {
    if (accessToken && refreshToken && user) {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
        localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      }

      this.userSubject.next(user);
      this.isAuthenticatedSubject.next(true);
    }
  }

  clearAuthState() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.ACCESS_TOKEN_KEY);
      localStorage.removeItem(this.REFRESH_TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    }

    this.userSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  getAccessToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.ACCESS_TOKEN_KEY);
    }
    return null;
  }

  getRefreshToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.REFRESH_TOKEN_KEY);
    }
    return null;
  }

  private getStoredUser(): User | null {
    if (isPlatformBrowser(this.platformId)) {
      const userStr = localStorage.getItem(this.USER_KEY);
      console.log(userStr);
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  }

  getCurrentUser(): User | null {
    return this.userSubject.value;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
