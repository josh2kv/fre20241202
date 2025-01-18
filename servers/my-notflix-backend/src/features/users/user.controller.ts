import { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service";
import { ApiResponse } from "@/shared/utils/api-response";
import { CreateUserDto, UpdateUserDto } from "./user.dto";

export class UserController {
  private userService = new UserService();

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userData: CreateUserDto = req.body;
      const user = await this.userService.createUser(userData);

      const { password, ...userResponse } = user;

      res.status(201).json(ApiResponse.success(userResponse));
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userData: UpdateUserDto = req.body;
      const user = await this.userService.updateUser(req.params.id, userData);

      const { password, ...userResponse } = user;

      res.status(200).json(ApiResponse.success(userResponse));
    } catch (error) {
      next(error);
    }
  }
}
