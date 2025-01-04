import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MoviesWithPagination, ResMovies } from '@shared/interfaces/movie';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesApiService {
  private readonly baseUrl = environment.tmdbApiBaseUrl;
  private readonly path = '/discover/movie';
  private readonly apiKey = environment.tmdbApiKey;
  private readonly headers = new HttpHeaders({
    Authorization: `Bearer ${this.apiKey}`,
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getMovies(page: number = 1): Observable<MoviesWithPagination> {
    console.log('getMovies', page);
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
      .get<ResMovies>(this.baseUrl + this.path, {
        headers: this.headers,
        params,
      })
      .pipe(
        map((response) => {
          return {
            data: response.results.map((movie) => ({
              id: movie.id,
              adult: movie.adult,
              backdropPath: movie.backdrop_path,
              genreIds: movie.genre_ids,
              originalLanguage: movie.original_language,
              originalTitle: movie.original_title,
              overview: movie.overview,
              popularity: movie.popularity,
              posterPath: movie.poster_path,
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
}
