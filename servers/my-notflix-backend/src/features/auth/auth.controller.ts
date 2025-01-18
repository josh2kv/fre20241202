import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import { LoginDto } from "./auth.dto";
import { ApiResponse } from "@/shared/utils/api-response";

export class AuthController {
  private authService = new AuthService();

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password }: LoginDto = req.body;
      const user = await this.authService.validateUser(email, password);
      const token = this.authService.generateToken(user);

      res.json(ApiResponse.success({ accessToken: token }));
    } catch (error) {
      next(error);
    }
  }
}
