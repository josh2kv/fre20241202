import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailComponent } from './movie-detail.component';
import { MovieDetailResolver } from './movie-detail.resolver';

const routes: Routes = [
  {
    path: '',
    component: MovieDetailComponent,
    resolve: { movieDetails: MovieDetailResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieDetailRoutingModule {}
