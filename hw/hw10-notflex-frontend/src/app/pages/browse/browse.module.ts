import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowseRoutingModule } from './browse-routing.module';
import { BrowseComponent } from './browse.component';
import { MovieListModule } from 'app/features/movie-list/movie-list.module';

@NgModule({
  declarations: [BrowseComponent],
  imports: [CommonModule, BrowseRoutingModule, MovieListModule],
})
export class BrowseModule {}
