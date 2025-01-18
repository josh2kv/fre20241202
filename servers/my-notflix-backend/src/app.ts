import express, { Express } from "express";
import "./core/env.config";

(() => {
  const app: Express = express();
  const port = process.env.PORT || 4231;

  app.use(express.json());

  app.get("/", (req, res) => {
    res.status(200).json({
      message: "Hello nodejs microsddervices!",
    });
  });

  app.listen(port, () => {
    console.log(`Server is running on port: http://localhost:${port}`);
  });
})();
