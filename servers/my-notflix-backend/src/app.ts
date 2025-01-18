import express, { Express } from "express";
import "@core/env.config";
import { initializeDatabase } from "./core/db";
import testRoute from "./routes/test.route";

const bootstrap = async () => {
  const app: Express = express();
  const port = process.env.APP_PORT || 3000;

  await initializeDatabase();

  app.use(express.json());

  app.get("/", (req, res) => {
    res.status(200).json({
      message: "Hello nodejs microsddervices!",
    });
  });

  app.use("/api", testRoute);

  app.listen(port, () => {
    console.log(`✅ Server is running on port: http://localhost:${port}`);
  });
};

bootstrap().catch((err) => {
  console.error("❌ Failed to start the application:", err);
  process.exit(1);
});
