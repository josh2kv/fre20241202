import { Component, Input } from '@angular/core';
import { ROUTE_SEGMENTS } from '@core/config/routes';
import { ROUTE_PATHS } from '@core/config/routes';
import { Movie } from '@shared/interfaces/movie';

@Component({
  selector: 'app-movie-card',
  standalone: false,

  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  toDetail = ROUTE_PATHS.BROWSE_DETAIL;
  @Input({ required: true }) movie!: Movie;
}
