import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieOverviewComponent } from './components/movie-overview/movie-overview.component';
import { MovieDetailRoutingModule } from './movie-detail-routing.module';
import { SharedModule } from '@shared/shared.module';
import { MovieDetailComponent } from './movie-detail.component';
import { VideoPlayerModalComponent } from './components/video-player-modal/video-player-modal.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
@NgModule({
  declarations: [
    MovieOverviewComponent,
    MovieDetailComponent,
    VideoPlayerModalComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MovieDetailRoutingModule,
    YouTubePlayerModule,
  ],
})
export class MovieDetailModule {}
