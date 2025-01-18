import { UserService } from "@/features/users/user.service";
import { User } from "@/features/users/user.model";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { UnauthorizedError } from "@/shared/errors";
import { JWT_REFRESH_EXPIRES_IN, JWT_SECRET } from "@/config/auth";
import { JWT_EXPIRES_IN } from "@/config/auth";
import jwt from "jsonwebtoken";
import { RegisterDto, UserWithToken } from "./auth.dto";
import { AppDataSource } from "@/config/db";
import { RefreshToken } from "./refresh-token.model";

export class AuthService {
  private userService = new UserService();
  private refreshTokenRepository = AppDataSource.getRepository(RefreshToken);

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findUserByEmail(email);
    if (!user) throw new UnauthorizedError("Invalid email or password");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedError("Invalid email or password");

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);

    const accessToken = this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user._id.toString());

    return {
      user,
      accessToken,
      refreshToken: refreshToken.token,
    };
  }

  async register(registerDto: RegisterDto) {
    const user = await this.userService.createUser(registerDto);

    const accessToken = this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user._id.toString());

    return {
      user,
      accessToken,
      refreshToken: refreshToken.token,
    };
  }

  async refreshToken(token: string) {
    const found = await this.refreshTokenRepository.findOne({
      where: { token },
    });

    if (!found || found.isRevoked)
      throw new UnauthorizedError("Invalid refresh token");

    if (found.expiresAt < new Date()) {
      found.isRevoked = true;
      await this.refreshTokenRepository.save(found);
      throw new UnauthorizedError("Refresh token expired");
    }

    const user = await this.userService.findUserById(found.userId);
    if (!user) throw new UnauthorizedError("User not found");

    const accessToken = this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user._id.toString());
    found.isRevoked = true;
    await this.refreshTokenRepository.save(found);

    return {
      accessToken,
      refreshToken: refreshToken.token,
      user,
    };
  }

  private generateAccessToken(user: User): string {
    const payload = { sub: user._id, email: user.email };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  }

  private generateRefreshToken(userId: string): Promise<RefreshToken> {
    const token = crypto.randomBytes(64).toString("hex");

    const refreshToken = this.refreshTokenRepository.create({
      userId,
      token,
      expiresAt: new Date(Date.now() + JWT_REFRESH_EXPIRES_IN),
      isRevoked: false,
    });

    return this.refreshTokenRepository.save(refreshToken);
  }
}
