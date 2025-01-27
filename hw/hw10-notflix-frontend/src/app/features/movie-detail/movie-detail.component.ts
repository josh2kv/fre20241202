import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { ROUTE_PATHS } from '@core/config/routes';
import { MovieService } from '@core/services/movie/movie.service';
import { MoviesCacheService } from '@core/services/movies-cache/movies-cache.service';
import { MovieWithCredits } from '@shared/interfaces/movie';
import { map, Subscription, switchMap } from 'rxjs';

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
  private routerSubscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private moviesCacheService: MoviesCacheService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.isLoading = false;
      this.movieDetails = data['movieDetails'];
      this.movieId = this.movieDetails.details.id;
    });

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
}
