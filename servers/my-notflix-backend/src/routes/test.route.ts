import { AppDataSource } from "@core/db";
import { Router } from "express";
import { User } from "@models/user.model";

const router = Router();
const userRepository = AppDataSource.getRepository(User);

router.post("/test-db", async (req, res) => {
  try {
    const user = userRepository.create({
      email: "test@example.com",
      password: "test123",
      tmdbApiKey: "test-key",
    });

    await userRepository.save(user);
    res.json({ message: "Test user created successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Database test failed", details: error });
  }
});

export default router;
