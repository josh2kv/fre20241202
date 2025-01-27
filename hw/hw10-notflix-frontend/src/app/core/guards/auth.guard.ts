import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from '@core/services/auth/auth-state.service';
import { ROUTE_PATHS } from '@core/config/routes';
import { Plan, UserRole } from '@shared/interfaces/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SNACKBAR_DEFAULT_CONFIG, SNACKBAR_ERROR_CONFIG } from '@core/config';

export const authGuard = () => {
  const authState = inject(AuthStateService);
  const router = inject(Router);

  if (authState.isAuthenticated()) {
    return true;
  }

  // Redirect to login page if not authenticated
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

export const planGuard = (plans: Plan[]) => {
  const authState = inject(AuthStateService);
  const snackBar = inject(MatSnackBar);

  if (plans.includes(authState.getCurrentUser()?.plan as Plan)) {
    return true;
  }

  snackBar.open(
    '⚠️ Please upgrade your plan to access this feature',
    'Close',
    SNACKBAR_DEFAULT_CONFIG
  );

  return false;
};
