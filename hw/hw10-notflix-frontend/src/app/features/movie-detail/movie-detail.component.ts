import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '@core/services/movie/movie.service';
import { MovieWithCredits } from '@shared/interfaces/movie';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-movie-detail',
  standalone: false,

  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss',
})
export class MovieDetailComponent implements OnInit {
  movieDetails!: MovieWithCredits;
  movieId!: number;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params) => +params['id']),
        switchMap((id) => {
          this.movieId = id;
          return this.movieService.getMovieDetails(id);
        })
      )
      .subscribe((movie) => {
        this.movieDetails = movie;
      });
  }
}
