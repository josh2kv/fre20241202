import { Component, OnInit } from '@angular/core';
import { MovieService } from '@core/services/movie/movie.service';
import { DataWithPagination } from '@shared/interfaces/common';
import { Movie, MoviesWithPagination } from '@shared/interfaces/movie';

@Component({
  selector: 'app-movie-grid',
  standalone: false,

  templateUrl: './movie-grid.component.html',
  styleUrl: './movie-grid.component.scss',
})
export class MovieGridComponent implements OnInit {
  movies: DataWithPagination<Movie[]> | null = null;
  loading = false;
  error = '';

  constructor(private moviesApiService: MovieService) {}

  ngOnInit(): void {
    this.moviesApiService.getMovies().subscribe({
      next: (moviesWithPagination) => {
        this.movies = moviesWithPagination;
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
        this.error = 'Failed to fetch movies. Please try again.';
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
