import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MovieWithCredits } from '@shared/interfaces/movie';
import { VideoPlayerModalComponent } from '../video-player-modal/video-player-modal.component';

@Component({
  selector: 'app-movie-overview',
  standalone: false,

  templateUrl: './movie-overview.component.html',
  styleUrl: './movie-overview.component.scss',
})
export class MovieOverviewComponent {
  @Input() movie!: MovieWithCredits;
  @Input() movieId!: number;

  modalWidth = '1400px';
  modalHeight = '720px';

  constructor(private dialog: MatDialog) {}

  openVideoPlayerModal() {
    this.dialog.open(VideoPlayerModalComponent, {
      data: { movieId: this.movieId },
      minWidth: this.modalWidth,
      minHeight: this.modalHeight,
      panelClass: 'video-player-modal-panel',
      backdropClass: 'video-player-modal-backdrop',
    });
  }
}
