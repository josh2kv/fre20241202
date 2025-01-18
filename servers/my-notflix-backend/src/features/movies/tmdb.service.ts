import axios, { AxiosInstance } from "axios";
import {
  BACKDROP_SIZES,
  POSTER_SIZES,
  PROFILE_SIZES,
  ResMovies,
} from "./movie.types";
import { ROUTE_SEGMENT } from "@/config/routes";
import {
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from "@/shared/errors";

export class TmdbService {
  private readonly tmdbApiBaseUrl = "https://api.themoviedb.org/3";
  private readonly movieListPath = "/discover/movie";
  private readonly movieDetailsPath = `/movie/${ROUTE_SEGMENT.ID_PARAM}`;
  private readonly movieCreditsPath = `/movie/${ROUTE_SEGMENT.ID_PARAM}/credits`;
  private readonly movieVideosPath = `/movie/${ROUTE_SEGMENT.ID_PARAM}/videos`;
  private readonly configPath = "/configuration";
  private readonly imageBaseUrl = "https://image.tmdb.org/t/p/";
  private readonly posterSize = POSTER_SIZES.W500;
  private readonly backdropSize = BACKDROP_SIZES.W1280;
  private readonly profileSize = PROFILE_SIZES.W45;
  private readonly client: AxiosInstance;

  constructor(apiKey: string) {
    this.client = axios.create({
      baseURL: this.tmdbApiBaseUrl,
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              throw new UnauthorizedError(error.response.data.status_message);
            case 404:
              throw new NotFoundError(error.response.data.status_message);
            default:
              throw new InternalServerError(error.response.data.status_message);
          }
        }
        throw error;
      }
    );
  }

  async getMovies(page: number = 1) {
    const params = {
      page,
      include_adult: false,
      include_video: false,
      language: "en-US",
      sort_by: "popularity.desc",
    };
    console.log("params", params);
    const response = await this.client.get<ResMovies>(this.movieListPath, {
      params,
    });

    return {
      data: response.data.results.map((movie) => ({
        id: movie.id,
        adult: movie.adult,
        backdropUrl: movie.backdrop_path
          ? this.getImageUrl(movie.backdrop_path, "backdrop")
          : null,
        genreIds: movie.genre_ids,
        originalLanguage: movie.original_language,
        originalTitle: movie.original_title,
        overview: movie.overview,
        popularity: movie.popularity,
        posterUrl: movie.poster_path
          ? this.getImageUrl(movie.poster_path, "poster")
          : null,
        releaseDate: movie.release_date,
        title: movie.title,
        video: movie.video,
        voteAverage: movie.vote_average,
        voteCount: movie.vote_count,
      })),
      meta: {
        totalPages: response.data.total_pages,
        totalItems: response.data.total_results,
        page,
        hasNextPage: page < response.data.total_pages,
        hasPrevPage: page > 1,
        perPage: 20,
      },
    };
  }

  getImageUrl(path: string, type: "poster" | "backdrop" | "profile"): string {
    return `${this.imageBaseUrl}${
      type === "poster"
        ? this.posterSize
        : type === "backdrop"
        ? this.backdropSize
        : this.profileSize
    }${path}`;
  }
}
