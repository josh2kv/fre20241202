import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { GlobalHeaderComponent } from './layouts/global-header/global-header.component';

@NgModule({
  declarations: [GlobalHeaderComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [GlobalHeaderComponent],
})
export class CoreModule {}
