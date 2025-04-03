import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTE_SEGMENTS } from '@core/config/routes';

const routes: Routes = [
  {
    path: ROUTE_SEGMENTS.REGISTER,
    loadChildren: () =>
      import('@features/register/register.module').then(
        (m) => m.RegisterModule
      ),
  },
  {
    path: ROUTE_SEGMENTS.LOGIN,
    loadChildren: () =>
      import('@features/login/login.module').then((m) => m.LoginModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
