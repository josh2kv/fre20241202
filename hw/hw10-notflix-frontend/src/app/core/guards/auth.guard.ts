import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, take } from 'rxjs';
import { ROUTE_PATHS } from '@core/config/routes';
import { selectUser } from '@store/auth/auth.selectors';
import { Plan } from '@shared/interfaces/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

export const authenticatedGuard: CanActivateFn = (
  route,
  state
): Observable<boolean | UrlTree> => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectUser).pipe(
    take(1),
    map((user) => {
      if (user) return true;
      console.log('authenticatedGuard failed route', route.url);
      console.log('authenticatedGuard failed state', state.url);
      return router.createUrlTree([ROUTE_PATHS.AUTH_LOGIN]);
    })
  );
};

export const publicOnlyGuard: CanActivateFn = (
  route,
  state
): Observable<boolean | UrlTree> => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectUser).pipe(
    take(1),
    map((user) => {
      if (!user) return true;

      return router.createUrlTree([ROUTE_PATHS.BROWSE]);
    })
  );
};

export const planGuard =
  (requiredPlans: Plan[]): CanActivateFn =>
  (route, state): Observable<boolean | UrlTree> => {
    const store = inject(Store);
    const snackBar = inject(MatSnackBar);
    const router = inject(Router);

    return store.select(selectUser).pipe(
      take(1),
      map((user) => {
        const hasAccess = user?.plan && requiredPlans.includes(user.plan);
        if (hasAccess) return true;

        snackBar.open(
          '⚠️ Please upgrade your plan to access this feature',
          'Close',
          { duration: 3000 }
        );

        return router.createUrlTree([ROUTE_PATHS.BROWSE]);
      })
    );
  };
