import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationStart } from '@angular/router';
import { Router } from '@angular/router';
import { ROUTE_PATHS, ROUTE_SEGMENTS } from '@core/config/routes';
import { MovieService } from '@core/services/movie/movie.service';
import { MoviesCacheService } from '@core/services/movies-cache/movies-cache.service';
import { PaginationMeta } from '@shared/interfaces/common';
import { Movie } from '@shared/interfaces/movie';
import { Subscription } from 'rxjs';

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
  private routerSubscription: Subscription | null = null;

  constructor(
    private moviesApiService: MovieService,
    private moviesCacheService: MoviesCacheService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const cachedMovies = this.moviesCacheService.getCachedMovies();

    if (cachedMovies.length) {
      this.movies = cachedMovies;
      this.meta = this.moviesCacheService.getMeta();
      this.page = this.meta?.page ?? 1;
      console.log('onInit', this.moviesCacheService.getScrollPosition());
      setTimeout(() => {
        window.scrollTo(0, this.moviesCacheService.getScrollPosition());
      }, 0);
    } else {
      this.loadNextMovies();
    }

    this.routerSubscription = this.router.events.subscribe((event) => {
      // NOTE: Clear cache when navigating away from the browse routes
      if (event instanceof NavigationStart) {
        if (!event.url.includes(ROUTE_PATHS.BROWSE)) {
          this.moviesCacheService.clearCache();
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }

  loadNextMovies(): void {
    this.isLoading = true;
    const page = (this.meta?.page ?? 1) + 1;
    this.moviesApiService.getMovies(page).subscribe((newMovies) => {
      this.movies = [...this.movies, ...newMovies.data];
      this.meta = newMovies.meta;
      this.isLoading = false;

      this.moviesCacheService.setCachedMovies(this.movies);
      this.moviesCacheService.setMeta(this.meta);
      console.log('onScroll', this.moviesCacheService.getScrollPosition());
    });
  }

  onScroll(): void {
    if (this.meta?.hasNextPage) {
      this.loadNextMovies();
    }
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.moviesCacheService.setScrollPosition(window.scrollY);
  }
}
