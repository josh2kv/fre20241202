import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieGridComponent } from './components/movie-grid/movie-grid.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [MovieGridComponent, MovieCardComponent],
  imports: [CommonModule, SharedModule],
  exports: [MovieGridComponent],
})
export class MovieListModule {}
