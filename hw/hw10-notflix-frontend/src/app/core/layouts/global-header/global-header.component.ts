import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ROUTE_PATHS, ROUTE_SEGMENTS } from '@core/config/routes';
import { AuthStateService } from '@core/services/auth/auth-state.service';
import { AuthService } from '@core/services/auth/auth.service';
import { User } from '@shared/interfaces/auth';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-global-header',
  standalone: false,

  templateUrl: './global-header.component.html',
  styleUrl: './global-header.component.scss',
})
export class GlobalHeaderComponent {
  toHome = ROUTE_PATHS.HOME;
  toLogin = ROUTE_PATHS.AUTH_LOGIN;
  hiddenLoginRoutes = [
    ROUTE_PATHS.AUTH_LOGIN,
    new RegExp(`^/${ROUTE_SEGMENTS.BROWSE}/\\d+$`),
  ];
  showRightSection = true;
  user: User | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authStateService: AuthStateService,
    private authService: AuthService
  ) {
    // NOTE: It doesn't work because `router.url` in the constructor runs before the navigation is complete.
    // this.showLogin = this.router.url !== ROUTE_PATH.AUTH_LOGIN;
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.showRightSection = !this.hiddenLoginRoutes.some((route) => {
          if (route instanceof RegExp) {
            return route.test(this.router.url);
          }
          return this.router.url === route;
        });
      });

    this.authStateService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  logout() {
    this.authService.logout();
  }
}
