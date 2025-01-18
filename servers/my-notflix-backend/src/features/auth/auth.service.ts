import { AppDataSource } from "@/config/db";
import { User } from "@/features/users/user.model";
import bcrypt from "bcrypt";
import { UnauthorizedError } from "@/shared/errors";
import { JWT_SECRET } from "@/config/auth";
import { JWT_EXPIRES_IN } from "@/config/auth";
import jwt from "jsonwebtoken";

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new UnauthorizedError("Invalid email or password");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedError("Invalid email or password");

    return user;
  }

  generateToken(user: User): string {
    const payload = { sub: user._id, email: user.email };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  }
}
