import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalHeaderComponent } from './layouts/global-header/global-header.component';

@NgModule({
  declarations: [GlobalHeaderComponent],
  imports: [CommonModule],
  exports: [GlobalHeaderComponent],
})
export class CoreModule {}
