import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalHeaderComponent } from './layouts/global-header/global-header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [GlobalHeaderComponent],
  imports: [CommonModule, RouterModule],
  exports: [GlobalHeaderComponent],
})
export class CoreModule {}
