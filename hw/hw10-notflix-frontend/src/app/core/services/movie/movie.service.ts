import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BACKDROP_SIZES,
  IMAGE_BASE_URL,
  POSTER_SIZES,
  PROFILE_SIZES,
} from '@core/config/movie';
import { ROUTE_SEGMENT } from '@core/config/routes';
import {
  MoviesWithPagination,
  MovieVideo,
  MovieWithCredits,
  ResMovieCredits,
  ResMovieDetails,
  ResMovies,
  ResMovieVideos,
} from '@shared/interfaces/movie';
import { environment } from 'environments/environment';
import { filter, forkJoin, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private baseUrl = environment.tmdbApiBaseUrl;
  private apiKey = environment.tmdbApiKey;
  private movieListPath = '/discover/movie';
  private movieDetailsPath = `/movie/${ROUTE_SEGMENT.DYNAMIC_ID}`;
  private movieCreditsPath = `/movie/${ROUTE_SEGMENT.DYNAMIC_ID}/credits`;
  private movieVideosPath = `/movie/${ROUTE_SEGMENT.DYNAMIC_ID}/videos`;
  private configPath = '/configuration';
  private headers = new HttpHeaders({
    Authorization: `Bearer ${this.apiKey}`,
    'Content-Type': 'application/json',
  });

  private imageBaseUrl = IMAGE_BASE_URL;
  posterSize = POSTER_SIZES.W500;
  backdropSize = BACKDROP_SIZES.ORIGINAL;
  profileSize = PROFILE_SIZES.W185;

  maxCastCount = 5;
  maxVideoCount = 10;

  constructor(private http: HttpClient) {}

  getMovies(page: number = 1): Observable<MoviesWithPagination> {
    const params = new HttpParams({
      fromObject: {
        page,
        include_adult: false,
        include_video: false,
        language: 'en-US',
        sort_by: 'popularity.desc',
      },
    });

    return this.http
      .get<ResMovies>(this.baseUrl + this.movieListPath, {
        headers: this.headers,
        params,
      })
      .pipe(
        map((response) => {
          return {
            data: response.results.map((movie) => ({
              id: movie.id,
              adult: movie.adult,
              backdropUrl: movie.backdrop_path
                ? this.getImageUrl(movie.backdrop_path, 'backdrop')
                : null,
              genreIds: movie.genre_ids,
              originalLanguage: movie.original_language,
              originalTitle: movie.original_title,
              overview: movie.overview,
              popularity: movie.popularity,
              posterUrl: movie.poster_path
                ? this.getImageUrl(movie.poster_path, 'poster')
                : null,
              releaseDate: movie.release_date,
              title: movie.title,
              video: movie.video,
              voteAverage: movie.vote_average,
              voteCount: movie.vote_count,
            })),
            meta: {
              totalPages: response.total_pages,
              totalItems: response.total_results,
              page,
              hasNextPage: page < response.total_pages,
              hasPrevPage: page > 1,
              perPage: 20,
            },
          };
        })
      );
  }

  getMovieWithCredits(id: number): Observable<MovieWithCredits> {
    return forkJoin({
      details: this.getMovieDetails(id).pipe(
        map((response) => ({
          id: response.id,
          title: response.title,
          tagline: response.tagline,
          overview: response.overview,
          posterUrl: response.poster_path
            ? this.getImageUrl(response.poster_path, 'poster')
            : null,
          backdropUrl: response.backdrop_path
            ? this.getImageUrl(response.backdrop_path, 'backdrop')
            : null,
          releaseDate: response.release_date,
          status: response.status,
          runtime: response.runtime,
          voteAverage: response.vote_average,
          adult: response.adult,
          video: response.video,
          genres: response.genres,
          imdbId: response.imdb_id,
        }))
      ),
      cast: this.getMovieCredits(id).pipe(
        map((response) => response.cast.slice(0, this.maxCastCount)),
        map((cast) =>
          cast
            .map((c) => {
              return {
                id: c.id,
                name: c.name,
                character: c.character,
                profileUrl: c.profile_path
                  ? this.getImageUrl(c.profile_path, 'profile')
                  : null,
                order: c.order,
              };
            })
            .sort((a, b) => a.order - b.order)
        )
      ),
    });
  }

  getMovieDetails(id: number): Observable<ResMovieDetails> {
    return this.http.get<ResMovieDetails>(
      this.baseUrl +
        this.movieDetailsPath.replace(ROUTE_SEGMENT.DYNAMIC_ID, id.toString()),
      {
        headers: this.headers,
      }
    );
  }

  getMovieVideos(id: number): Observable<MovieVideo[]> {
    return this.http
      .get<ResMovieVideos>(
        this.baseUrl +
          this.movieVideosPath.replace(ROUTE_SEGMENT.DYNAMIC_ID, id.toString()),
        {
          headers: this.headers,
        }
      )
      .pipe(
        map((response) =>
          response.results.slice(0, this.maxVideoCount).map((video) => ({
            id: video.id,
            key: video.key,
            name: video.name,
            site: video.site,
            type: video.type,
          }))
        )
      );
  }

  getMovieCredits(id: number): Observable<ResMovieCredits> {
    return this.http.get<ResMovieCredits>(
      this.baseUrl +
        this.movieCreditsPath.replace(ROUTE_SEGMENT.DYNAMIC_ID, id.toString()),
      {
        headers: this.headers,
      }
    );
  }

  getImageUrl(path: string, type: 'poster' | 'backdrop' | 'profile'): string {
    return `${this.imageBaseUrl}${
      type === 'poster'
        ? this.posterSize
        : type === 'backdrop'
        ? this.backdropSize
        : this.profileSize
    }${path}`;
  }
}
