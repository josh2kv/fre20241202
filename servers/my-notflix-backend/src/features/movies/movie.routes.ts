import { Router } from "express";
import { MovieController } from "./movie.controller";
import { ROUTE_SEGMENT } from "@/config/routes";
import { validateDto } from "@/shared/middlewares/validation.middleware";
import { GetMoviesDto, GetMovieWithCreditsDto } from "./movie.dto";

const router = Router();
const movieController = new MovieController();

router.get(
  ROUTE_SEGMENT.MOVIES.ROOT,
  validateDto(GetMoviesDto, "query"),
  movieController.getMovies.bind(movieController)
);

router.get(
  ROUTE_SEGMENT.ID_PARAM,
  validateDto(GetMovieWithCreditsDto, "params"),
  movieController.getMovieWithCredits.bind(movieController)
);

export default router;
