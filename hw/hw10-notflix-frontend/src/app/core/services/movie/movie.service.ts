import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie, MovieVideo, MovieWithCredits } from '@shared/interfaces/movie';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import {
  ApiSuccessResponse,
  DataWithPagination,
} from '@shared/interfaces/common';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = environment.apiBaseUrl;
  private movieListPath = '/movies';
  private movieVideosPath = '/videos';

  constructor(private http: HttpClient) {}

  getMovies(page: number = 1): Observable<DataWithPagination<Movie[]>> {
    const params = new HttpParams().set('page', page.toString());

    return this.http
      .get<ApiSuccessResponse<DataWithPagination<Movie[]>>>(
        `${this.apiUrl + this.movieListPath}`,
        { params }
      )
      .pipe(map((res) => res.data));
  }

  getMovieDetails(id: number): Observable<MovieWithCredits> {
    return this.http
      .get<ApiSuccessResponse<MovieWithCredits>>(
        `${this.apiUrl + this.movieListPath}/${id}`
      )
      .pipe(map((res) => res.data));
  }

  getMovieVideos(id: number): Observable<MovieVideo[]> {
    return this.http
      .get<ApiSuccessResponse<MovieVideo[]>>(
        `${this.apiUrl + this.movieListPath}/${id}${this.movieVideosPath}`
      )
      .pipe(map((res) => res.data));
  }
}
