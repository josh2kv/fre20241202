import path from "node:path";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

const evnPath =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env";
const myEnv = dotenv.config({
  path: path.resolve(__dirname, "../../", evnPath),
});

dotenvExpand.expand(myEnv);
