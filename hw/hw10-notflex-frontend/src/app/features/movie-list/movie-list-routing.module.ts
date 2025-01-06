import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieGridComponent } from '@features/movie-list/components/movie-grid/movie-grid.component';

const routes: Routes = [
  {
    path: '',
    component: MovieGridComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieListRoutingModule {}
