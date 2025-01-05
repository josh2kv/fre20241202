import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LIGHT_MODE_ROUTES } from '@core/config/routes';
import { ThemeMode } from '@shared/interfaces/common';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  private lightModeRoutes: string[] = LIGHT_MODE_ROUTES;
  private themeSubject = new BehaviorSubject<ThemeMode>('dark-mode');
  themeMode$ = this.themeSubject.asObservable();

  constructor(private router: Router) {
    if (isPlatformBrowser(this.platformId)) {
      this.onRouteChange(this.router.url);

      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe((event) => this.onRouteChange(event.url));
    }
  }

  private onRouteChange(route: string): void {
    const isLightModeRoute = this.lightModeRoutes.includes(route);
    const currentThemeMode = this.themeSubject.getValue();
    if (isLightModeRoute && currentThemeMode === 'dark-mode') {
      this.setThemeMode('light-mode');
    } else if (!isLightModeRoute && currentThemeMode === 'light-mode') {
      this.setThemeMode('dark-mode');
    }
  }

  setThemeMode(mode: ThemeMode) {
    this.themeSubject.next(mode);

    if (isPlatformBrowser(this.platformId)) {
      const html = document.documentElement;
      html.classList.remove('light-mode', 'dark-mode');
      html.classList.add(mode);
    }
  }
}
