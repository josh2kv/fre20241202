import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTE_SEGMENTS } from '@core/config/routes';

const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTE_SEGMENTS.PROFILE,
    pathMatch: 'full',
  },
  {
    path: ROUTE_SEGMENTS.PROFILE,
    loadChildren: () =>
      import('@features/profile/profile.module').then((m) => m.ProfileModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
