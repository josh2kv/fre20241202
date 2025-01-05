import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterModule } from '@features/register/register.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthRoutingModule, RegisterModule],
})
export class AuthModule {}
