import { Component, Input } from '@angular/core';
import { ROUTE_SEGMENT } from '@core/config/routes';
import { ROUTE_PATH } from '@core/config/routes';
import { Movie } from '@shared/interfaces/movie';

@Component({
  selector: 'app-movie-card',
  standalone: false,

  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  toDetail = ROUTE_PATH.BROWSE_DETAIL;
  @Input({ required: true }) movie!: Movie;
}
