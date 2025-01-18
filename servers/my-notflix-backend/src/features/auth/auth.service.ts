import { UserService } from "@/features/users/user.service";
import { User } from "@/features/users/user.model";
import bcrypt from "bcrypt";
import { UnauthorizedError } from "@/shared/errors";
import { JWT_SECRET } from "@/config/auth";
import { JWT_EXPIRES_IN } from "@/config/auth";
import jwt from "jsonwebtoken";
import { RegisterDto } from "./auth.dto";

export class AuthService {
  private userService = new UserService();

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findUserByEmail(email);
    if (!user) throw new UnauthorizedError("Invalid email or password");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedError("Invalid email or password");

    return user;
  }

  async register(registerDto: RegisterDto) {
    const user = await this.userService.createUser(registerDto);

    const token = this.generateToken(user);
    const { password, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      accessToken: token,
    };
  }

  generateToken(user: User): string {
    const payload = { sub: user._id, email: user.email };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  }
}
