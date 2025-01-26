import { Component, OnInit } from '@angular/core';
import { MovieService } from '@core/services/movie/movie.service';
import { DataWithPagination, PaginationMeta } from '@shared/interfaces/common';
import { Movie, MoviesWithPagination } from '@shared/interfaces/movie';

@Component({
  selector: 'app-movie-grid',
  standalone: false,

  templateUrl: './movie-grid.component.html',
  styleUrl: './movie-grid.component.scss',
})
export class MovieGridComponent implements OnInit {
  page = 0;
  movies: Movie[] = [];
  meta: PaginationMeta | null = null;
  isLoading = false;
  error = '';

  constructor(private moviesApiService: MovieService) {}

  ngOnInit(): void {
    this.loadNextMovies();
  }

  loadNextMovies(): void {
    this.isLoading = true;
    const page = (this.meta?.page ?? 1) + 1;
    this.moviesApiService.getMovies(page).subscribe((newMovies) => {
      this.movies = [...this.movies, ...newMovies.data];
      this.meta = newMovies.meta;
      this.isLoading = false;
    });
  }

  onScroll(): void {
    if (this.meta?.hasNextPage) {
      this.loadNextMovies();
    }
  }
}
