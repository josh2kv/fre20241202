import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { MovieGridComponent } from './components/movie-grid/movie-grid.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MovieListRoutingModule } from './movie-list-routing.module';

@NgModule({
  declarations: [MovieGridComponent, MovieCardComponent],
  imports: [CommonModule, MovieListRoutingModule, SharedModule],
})
export class MovieListModule {}
