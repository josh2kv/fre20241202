import { Router } from "express";
import { MovieController } from "./movie.controller";
import { ROUTE_SEGMENT } from "@/config/routes";
import { validateDto } from "@/shared/middlewares/validation.middleware";
import { GetMoviesDto } from "./movie.dto";

const router = Router();
const movieController = new MovieController();

router.get(
  "/",
  validateDto(GetMoviesDto, "query"),
  movieController.getMovies.bind(movieController)
);

export default router;
