import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CredentialsStepComponent } from './components/credentials-step/credentials-step.component';

const routes: Routes = [
  {
    path: '',
    component: CredentialsStepComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterRoutingModule {}
