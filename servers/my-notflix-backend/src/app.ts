import express, { Express, Request, Response, NextFunction } from "express";
import "@/config/env";
import { initializeDatabase } from "@/config/db";
import { API_PREFIX } from "./config/routes";
import { API_VERSION } from "./config/routes";
import { ROUTE_SEGMENT } from "./config/routes";
import userRoutes from "./features/users/user.routes";
import { errorHandler } from "./shared/middlewares/error.middleware";
const bootstrap = async () => {
  const app: Express = express();
  const apiRouter = express.Router();
  const port = process.env.APP_PORT || 3000;

  await initializeDatabase();

  app.use(express.json());

  // apiRouter.use(ROUTE_SEGMENT.ROOT, (req, res) => {
  //   res.status(200).json({
  //     message: "This is for testing! and testing is good!",
  //   });
  // });

  apiRouter.use(ROUTE_SEGMENT.USERS, userRoutes);

  app.use(API_PREFIX + API_VERSION, apiRouter);

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
