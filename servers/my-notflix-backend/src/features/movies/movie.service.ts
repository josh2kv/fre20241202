import { TmdbService } from "./tmdb.service";

export class MovieService {
  getMovies({ page, apiKey }: { page: number; apiKey: string }) {
    const client = new TmdbService(apiKey);
    return client.getMovies(page);
  }
}
