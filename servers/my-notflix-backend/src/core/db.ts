import { User } from "@models/user.model";
import { DataSource } from "typeorm";

console.log(process.env.DB_URI);
export const AppDataSource = new DataSource({
  type: "mongodb",
  url: process.env.DB_URI,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  synchronize: process.env.NODE_ENV === "development",
  logging: process.env.NODE_ENV === "development",
  entities: [User],
  subscribers: [],
  migrations: [],
});

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("✅ Database connection has been established successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
    throw error;
  }
};
