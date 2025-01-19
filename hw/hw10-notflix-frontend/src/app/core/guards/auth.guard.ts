import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from '@core/services/auth/auth-state.service';
import { ROUTE_PATHS } from '@core/config/routes';

export const authGuard = () => {
  const authState = inject(AuthStateService);
  const router = inject(Router);
  console.log('authState', authState.isAuthenticated());
  if (authState.isAuthenticated()) {
    return true;
  }

  // Redirect to login page
  return router.createUrlTree([ROUTE_PATHS.AUTH_LOGIN]);
};

export const publicOnlyGuard = () => {
  const authState = inject(AuthStateService);
  const router = inject(Router);

  if (!authState.isAuthenticated()) {
    return true;
  }

  // Redirect to home if already authenticated
  return router.createUrlTree([ROUTE_PATHS.BROWSE]);
};
