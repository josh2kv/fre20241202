import { Request, Response, NextFunction } from "express";
import { MovieService } from "./movie.service";
import { BadRequestError } from "@/shared/errors";
import { ApiResponse } from "@/shared/utils/api-response";

export class MovieController {
  private movieService = new MovieService();

  async getMovies(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = req;
      const tmdbApiKey = user?.tmdbApiKey;
      if (!tmdbApiKey) throw new BadRequestError("TMDB API key is required");

      const { page } = req.query;
      const movies = await this.movieService.getMovies({
        page: Number(page),
        apiKey: tmdbApiKey,
      });
      res.json(ApiResponse.success(movies));
    } catch (error) {
      next(error);
    }
  }
}
