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
  selectedVideoId: string = '';
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
      this.selectedVideoId = videos[0]?.key;
    });
  }

  selectVideo(videoId: string) {
    this.selectedVideoId = videoId;
  }
}
