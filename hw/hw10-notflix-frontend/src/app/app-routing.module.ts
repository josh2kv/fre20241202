import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: ROUTE_PATHS.HOME,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
