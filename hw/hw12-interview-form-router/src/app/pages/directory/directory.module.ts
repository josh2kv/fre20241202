import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectoryRoutingModule } from './directory-routing.module';
import { UserCardComponent } from './user-card/user-card.component';
import { DirectoryComponent } from './directory.component';

@NgModule({
  declarations: [DirectoryComponent, UserCardComponent],
  imports: [CommonModule, DirectoryRoutingModule],
})
export class DirectoryModule {}
