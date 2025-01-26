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
  isLoading = true;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.isLoading = false;
      this.movieDetails = data['movieDetails'];
      this.movieId = this.movieDetails.details.id;
    });
  }
}
