import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { User } from "@/features/users/user.model";
import { AppDataSource } from "./db";

export const JWT_SECRET = process.env.JWT_SECRET || "1234567890";
export const JWT_EXPIRES_IN = "24h";

export const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (payload, done) => {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({
        where: { _id: payload.sub },
      });

      if (!user) return done(null, false);

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }
);
