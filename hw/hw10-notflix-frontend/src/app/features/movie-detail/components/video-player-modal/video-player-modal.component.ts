import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovieService } from '@core/services/movie/movie.service';
import { MovieVideo } from '@shared/interfaces/movie';

@Component({
  selector: 'app-video-player-modal',
  standalone: false,

  templateUrl: './video-player-modal.component.html',
  styleUrl: './video-player-modal.component.scss',
})
export class VideoPlayerModalComponent implements OnInit {
  movieId: number;
  selectedVideoIndex: number = 0;
  movieVideos: MovieVideo[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { movieId: number },
    private movieService: MovieService
  ) {
    this.movieId = data.movieId;
  }

  ngOnInit(): void {
    this.movieService.getMovieVideos(this.movieId).subscribe((videos) => {
      this.movieVideos = videos;
      this.selectedVideoIndex = 0;
    });
  }

  selectVideo(index: number) {
    this.selectedVideoIndex = index;
  }

  goBack() {
    this.selectedVideoIndex = Math.max(0, this.selectedVideoIndex - 1);
  }

  goForward() {
    this.selectedVideoIndex = Math.min(
      this.movieVideos.length - 1,
      this.selectedVideoIndex + 1
    );
  }
}
