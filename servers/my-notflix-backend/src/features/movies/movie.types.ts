export const movieConfig = {
  images: {
    baseUrl: "http://image.tmdb.org/t/p/",
    secureBaseUrl: "https://image.tmdb.org/t/p/",
    backdropSizes: ["w300", "w780", "w1280", "original"],
    logoSizes: ["w45", "w92", "w154", "w185", "w300", "w500", "original"],
    posterSizes: ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
    profileSizes: ["w45", "w185", "h632", "original"],
    stillSizes: ["w92", "w185", "w300", "original"],
  },
} as const;

export const POSTER_SIZES = {
  W92: "w92",
  W154: "w154",
  W185: "w185",
  W342: "w342",
  W500: "w500",
  W780: "w780",
  ORIGINAL: "original",
} as const;

export const BACKDROP_SIZES = {
  W300: "w300",
  W780: "w780",
  W1280: "w1280",
  ORIGINAL: "original",
} as const;

export const PROFILE_SIZES = {
  W45: "w45",
  W185: "w185",
  H632: "h632",
  ORIGINAL: "original",
} as const;

export const STILL_SIZES = {
  W92: "w92",
  W185: "w185",
  W300: "w300",
  ORIGINAL: "original",
} as const;

export const LOGO_SIZES = {
  W45: "w45",
  W92: "w92",
  W154: "w154",
  W185: "w185",
  W300: "w300",
  W500: "w500",
  ORIGINAL: "original",
} as const;

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
  title: string;
  backdropUrl: string | null;
  posterUrl: string | null;
  genreIds: number[];
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  releaseDate: string;
  adult: boolean;
  video: boolean;
  voteAverage: number;
  voteCount: number;
}
