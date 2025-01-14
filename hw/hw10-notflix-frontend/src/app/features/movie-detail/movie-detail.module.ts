import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieOverviewComponent } from './components/movie-overview/movie-overview.component';
import { MovieDetailRoutingModule } from './movie-detail-routing.module';
import { SharedModule } from '@shared/shared.module';
import { MovieDetailComponent } from './movie-detail.component';

@NgModule({
  declarations: [MovieOverviewComponent, MovieDetailComponent],
  imports: [CommonModule, MovieDetailRoutingModule, SharedModule],
})
export class MovieDetailModule {}
