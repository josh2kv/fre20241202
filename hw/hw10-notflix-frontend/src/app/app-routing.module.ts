import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { ROUTE_PATHS, ROUTE_SEGMENTS } from '@core/config/routes';
import { authGuard, publicOnlyGuard } from '@core/guards/auth.guard';
import { HomeComponent } from '@pages/home/home.component';

const routes: Routes = [
  {
    path: ROUTE_SEGMENTS.AUTH,
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [publicOnlyGuard],
  },
  {
    path: ROUTE_SEGMENTS.BROWSE,
    loadChildren: () =>
      import('./pages/browse/browse.module').then((m) => m.BrowseModule),
    canActivate: [authGuard],
  },
  {
    path: ROUTE_SEGMENTS.ACCOUNT,
    loadChildren: () =>
      import('./pages/account/account.module').then((m) => m.AccountModule),
    canActivate: [authGuard],
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: ROUTE_PATHS.HOME,
  },
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'disabled', // Disable automatic scroll restoration
  anchorScrolling: 'enabled', // Enable anchor scrolling if needed
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
