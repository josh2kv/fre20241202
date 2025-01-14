import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTE_SEGMENT } from '@core/config/routes';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@features/movie-list/movie-list.module').then(
        (m) => m.MovieListModule
      ),
  },
  {
    path: ROUTE_SEGMENT.DYNAMIC_ID,
    loadChildren: () =>
      import('@features/movie-detail/movie-detail.module').then(
        (m) => m.MovieDetailModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrowseRoutingModule {}
