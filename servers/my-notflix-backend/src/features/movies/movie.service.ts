import { TmdbService } from "./tmdb.service";

// NOTE: TmdbService cannot be singleton because apiKey can vary in different requests
export class MovieService {
  getMovies({ page, apiKey }: { page: number; apiKey: string }) {
    const client = new TmdbService(apiKey);
    return client.getMovies(page);
  }

  getMovieWithCredits(id: number, apiKey: string) {
    const client = new TmdbService(apiKey);
    return client.getMovieWithCredits(id);
  }
}
