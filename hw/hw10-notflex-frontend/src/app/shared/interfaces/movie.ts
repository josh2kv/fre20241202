import { PaginationMeta } from './common';

export interface MoviesQueryParams {
  page: number;
}

export interface ResMovie {
  id: number;
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface ResMovies {
  page: number;
  results: ResMovie[];
  total_pages: number;
  total_results: number;
}

export interface Movie {
  id: number;
  adult: boolean;
  backdropPath: string | null;
  genreIds: number[];
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  posterPath: string | null;
  releaseDate: string;
  title: string;
  video: boolean;
  voteAverage: number;
  voteCount: number;
}

export interface MoviesWithPagination {
  data: Movie[];
  meta: PaginationMeta;
}
