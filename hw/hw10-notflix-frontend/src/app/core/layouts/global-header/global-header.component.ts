import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ROUTE_PATH, ROUTE_SEGMENT } from '@core/config/routes';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-global-header',
  standalone: false,

  templateUrl: './global-header.component.html',
  styleUrl: './global-header.component.scss',
})
export class GlobalHeaderComponent {
  toHome = ROUTE_PATH.HOME;
  toLogin = ROUTE_PATH.AUTH_LOGIN;
  hiddenLoginRoutes = [
    ROUTE_PATH.AUTH_LOGIN,
    new RegExp(`^/${ROUTE_SEGMENT.BROWSE}/\\d+$`),
  ];
  showLogin = true;
  private destroy$ = new Subject<void>();

  constructor(private router: Router, private route: ActivatedRoute) {
    // NOTE: It doesn't work because `router.url` in the constructor runs before the navigation is complete.
    // this.showLogin = this.router.url !== ROUTE_PATH.AUTH_LOGIN;

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.showLogin = !this.hiddenLoginRoutes.some((route) => {
          if (route instanceof RegExp) {
            return route.test(this.router.url);
          }
          return this.router.url === route;
        });
      });
  }
}
