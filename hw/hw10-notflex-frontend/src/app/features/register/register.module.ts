import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CredentialsStepComponent } from './components/credentials-step/credentials-step.component';
import { AccountStepComponent } from './components/account-step/account-step.component';
import { PlanStepComponent } from './components/plan-step/plan-step.component';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CredentialsStepComponent,
    AccountStepComponent,
    PlanStepComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class RegisterModule {}
