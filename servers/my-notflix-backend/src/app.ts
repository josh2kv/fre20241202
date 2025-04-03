import express, { Express, Request, Response, NextFunction } from "express";
import "@/config/env";
import { initializeDatabase } from "@/config/db";
import { API_PREFIX } from "./config/routes";
import { API_VERSION } from "./config/routes";
import { ROUTE_SEGMENT } from "./config/routes";
import userRoutes from "./features/users/user.routes";
import { errorHandler } from "./shared/middlewares/error.middleware";
import { ApiResponse } from "./shared/utils/api-response";
import { authenticate } from "./shared/middlewares/auth.middleware";
import passport from "passport";
import { jwtStrategy } from "./config/auth";
import authRoutes from "./features/auth/auth.routes";
import movieRoutes from "./features/movies/movie.routes";

const bootstrap = async () => {
  const app: Express = express();
  const apiRouter = express.Router();
  const port = process.env.APP_PORT || 3000;

  await initializeDatabase();

  passport.use(jwtStrategy);
  app.use(express.json());

  apiRouter.use(ROUTE_SEGMENT.AUTH.ROOT, authRoutes);

  // Protected routes
  apiRouter.use(authenticate);
  apiRouter.use(ROUTE_SEGMENT.USERS.ROOT, userRoutes);
  apiRouter.use(ROUTE_SEGMENT.MOVIES.ROOT, movieRoutes);

  app.use(API_PREFIX + API_VERSION, apiRouter);

  app.use("*", (req: Request, res: Response) => {
    res
      .status(404)
      .json(ApiResponse.error(`Route ${req.originalUrl} not found`));
  });

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    errorHandler(err, req, res, next);
  });
  app.listen(port, () => {
    console.log(`✅ Server is running on port: http://localhost:${port}`);
  });
};

bootstrap().catch((err) => {
  console.error("❌ Failed to start the application:", err);
  process.exit(1);
});
