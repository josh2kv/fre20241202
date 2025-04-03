import axios, { AxiosInstance } from "axios";
import {
  BACKDROP_SIZES,
  MovieVideo,
  MovieWithCredits,
  POSTER_SIZES,
  PROFILE_SIZES,
  ResMovieCredits,
  ResMovieDetails,
  ResMovies,
  ResMovieVideos,
} from "./movie.types";
import { ROUTE_SEGMENT } from "@/config/routes";
import {
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from "@/shared/errors";

export class TmdbService {
  private readonly client: AxiosInstance;

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
  private readonly maxCastCount = 5;
  private readonly maxVideoCount = 10;

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

  async getMovieWithCredits(id: number): Promise<MovieWithCredits> {
    const rawDetails = await this.getMovieDetails(id);
    const rawCredits = await this.getMovieCredits(id);

    return {
      details: {
        id: rawDetails.id,
        title: rawDetails.title,
        tagline: rawDetails.tagline,
        overview: rawDetails.overview,
        posterUrl: rawDetails.poster_path
          ? this.getImageUrl(rawDetails.poster_path, "poster")
          : null,
        backdropUrl: rawDetails.backdrop_path
          ? this.getImageUrl(rawDetails.backdrop_path, "backdrop")
          : null,
        releaseDate: rawDetails.release_date,
        status: rawDetails.status,
        runtime: rawDetails.runtime,
        voteAverage: rawDetails.vote_average,
        adult: rawDetails.adult,
        video: rawDetails.video,
      },
      cast: rawCredits.cast.slice(0, this.maxCastCount).map((c) => ({
        id: c.id,
        name: c.name,
        character: c.character,
        profileUrl: c.profile_path
          ? this.getImageUrl(c.profile_path, "profile")
          : null,
        order: c.order,
      })),
    };
  }

  async getMovieDetails(id: number): Promise<ResMovieDetails> {
    const response = await this.client.get<ResMovieDetails>(
      this.movieDetailsPath.replace(ROUTE_SEGMENT.ID_PARAM, id.toString())
    );
    return response.data;
  }

  async getMovieVideos(id: number): Promise<MovieVideo[]> {
    const response = await this.client.get<ResMovieVideos>(
      this.movieVideosPath.replace(ROUTE_SEGMENT.ID_PARAM, id.toString())
    );
    return response.data.results.map((video) => ({
      id: video.id,
      key: video.key,
      name: video.name,
      site: video.site,
      type: video.type,
    }));
  }

  async getMovieCredits(id: number): Promise<ResMovieCredits> {
    const response = await this.client.get<ResMovieCredits>(
      this.movieCreditsPath.replace(ROUTE_SEGMENT.ID_PARAM, id.toString())
    );
    return response.data;
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
