import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component';
import { CredentialsStepComponent } from './components/credentials-step/credentials-step.component';
import { PlanStepComponent } from './components/plan-step/plan-step.component';
import { AccountStepComponent } from './components/account-step/account-step.component';
import { ROUTE_SEGMENTS } from '@core/config/routes';

const routes: Routes = [
  {
    path: '',
    component: RegisterComponent,
    children: [
      {
        path: '',
        redirectTo: ROUTE_SEGMENTS.CREDENTIALS,
        pathMatch: 'full',
      },
      {
        path: ROUTE_SEGMENTS.CREDENTIALS,
        component: CredentialsStepComponent,
      },
      {
        path: ROUTE_SEGMENTS.ACCOUNT,
        component: AccountStepComponent,
      },
      {
        path: ROUTE_SEGMENTS.PLAN,
        component: PlanStepComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: ROUTE_SEGMENTS.CREDENTIALS,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterRoutingModule {}
