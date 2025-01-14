import { Component, Input } from '@angular/core';
import { MovieWithCredits } from '@shared/interfaces/movie';

@Component({
  selector: 'app-movie-overview',
  standalone: false,

  templateUrl: './movie-overview.component.html',
  styleUrl: './movie-overview.component.scss',
})
export class MovieOverviewComponent {
  @Input() movie!: MovieWithCredits;
}
