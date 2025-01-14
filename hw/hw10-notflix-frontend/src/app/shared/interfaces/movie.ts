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

export interface MoviesWithPagination {
  data: Movie[];
  meta: PaginationMeta;
}

export interface ResMovieDetails {
  // Basic Info
  id: number; // TMDB movie ID
  title: string; // Movie title
  original_title: string; // Original language title
  tagline: string; // Movie's tagline/slogan
  overview: string; // Plot summary

  // Media
  poster_path: string; // Poster image path (needs base URL)
  backdrop_path: string; // Background image path (needs base URL)

  // Dates & Status
  release_date: string; // Theater release date
  status: string; // Released, In Production, etc.

  // Numbers & Metrics
  runtime: number; // Movie duration in minutes
  budget: number; // Production budget in USD
  revenue: number; // Box office revenue in USD
  popularity: number; // TMDB popularity score
  vote_average: number; // Average rating (0-10)
  vote_count: number; // Number of votes

  // Classifications
  adult: boolean; // Adult content flag
  video: boolean; // Video availability

  // Related Content
  belongs_to_collection: {
    // Part of a movie series
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };

  // Detailed Classifications
  genres: {
    // Movie genres
    id: number;
    name: string;
  }[];

  // Production Info
  production_companies: {
    // Studios/Companies
    id: number;
    name: string;
    logo_path: string;
    origin_country: string;
  }[];

  production_countries: {
    // Production countries
    iso_3166_1: string; // Country code
    name: string; // Country name
  }[];

  // Language Info
  original_language: string; // Original language code
  spoken_languages: {
    // All languages in movie
    english_name: string;
    iso_639_1: string; // Language code
    name: string;
  }[];

  // External Links
  homepage: string; // Official website
  imdb_id: string; // IMDB ID
}

export interface MovieDetails {
  id: number;
  title: string;
  tagline: string;
  overview: string;
  posterUrl: string | null;
  backdropUrl: string | null;
  releaseDate: string;
  status: string;
  runtime: number;
  voteAverage: number;
  adult: boolean;
  video: boolean;
}

export interface ResCast {
  adult: boolean; // Flag for adult content actor
  gender: number; // 1: Female, 2: Male
  id: number; // Actor's unique TMDB ID
  known_for_department: string; // Main profession (e.g., "Acting")
  name: string; // Actor's professional name
  original_name: string; // Actor's birth/legal name
  popularity: number; // TMDB popularity score
  profile_path: string | null; // Path to actor's photo
  cast_id: number; // Unique ID for this casting
  character: string; // Character name (e.g., "Moana (voice)")
  credit_id: string; // Unique ID for this credit
  order: number; // Billing order (0 is lead)
}

export interface ResCrew {
  adult: boolean; // Flag for adult content person
  gender: number; // 1: Female, 2: Male
  id: number; // Crew member's TMDB ID
  known_for_department: string; // Main department
  name: string; // Crew member's name
  original_name: string; // Birth/legal name
  popularity: number; // TMDB popularity score
  profile_path: string | null; // Path to photo
  credit_id: string; // Unique credit ID
  department: string; // Department (e.g., "Directing")
  job: string; // Specific role (e.g., "Director")
}
export interface ResMovieCredits {
  // Raw response from TMDB API
  id: number; // Movie ID
  cast: ResCast[];
  crew: ResCrew[];
}

export interface MovieCast {
  id: number;
  name: string;
  character: string;
  profileUrl: string | null;
  order: number;
}

export interface MovieWithCredits {
  details: MovieDetails;
  cast: MovieCast[];
}

export interface ResMovieVideos {
  id: number;
  results: {
    iso_639_1: string; // Language code
    iso_3166_1: string; // Country code
    name: string; // Video title
    key: string; // Video key
    site: string; // Video site
    size: number; // Video resolution
    type: string; // Video type
    official: boolean; // Official flag
    published_at: string; // Video publish date
    id: string; // Video ID
  }[];
}

export interface MovieVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}
