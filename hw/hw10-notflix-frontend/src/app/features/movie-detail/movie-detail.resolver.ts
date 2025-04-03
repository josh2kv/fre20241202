import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { MovieService } from '@core/services/movie/movie.service';
import { MovieWithCredits } from '@shared/interfaces/movie';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MovieDetailResolver implements Resolve<MovieWithCredits> {
  constructor(private movieService: MovieService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<MovieWithCredits> {
    const id = +route.params['id'];
    return this.movieService.getMovieDetails(id);
  }
}
