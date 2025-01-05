import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BACKDROP_SIZE,
  IMAGE_BASE_URL,
  movieConfig,
  POSTER_SIZE,
} from '@core/config/movie';
import { MoviesWithPagination, ResMovies } from '@shared/interfaces/movie';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private baseUrl = environment.tmdbApiBaseUrl;
  private apiKey = environment.tmdbApiKey;
  private movieListPath = '/discover/movie';
  private movieDetailsPath = '/movie/:id';
  private configPath = '/configuration';
  private headers = new HttpHeaders({
    Authorization: `Bearer ${this.apiKey}`,
    'Content-Type': 'application/json',
  });

  private imageBaseUrl = IMAGE_BASE_URL;
  posterSize = POSTER_SIZE.W342;
  backdropSize = BACKDROP_SIZE.W1280;

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

  getImageUrl(path: string, type: 'poster' | 'backdrop'): string {
    return `${this.imageBaseUrl}${
      type === 'poster' ? this.posterSize : this.backdropSize
    }${path}`;
  }
}
