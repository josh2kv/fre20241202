import { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service";
import { ApiResponse } from "@/shared/utils/api-response";
import { CreateUserDto, UpdateUserDto } from "./user.dto";
import { UserTransformer } from "./user.transformer";

export class UserController {
  private userService = new UserService();

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userData: CreateUserDto = req.body;
      const user = await this.userService.createUser(userData);

      res
        .status(201)
        .json(ApiResponse.success(UserTransformer.toBriefUser(user)));
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userData: UpdateUserDto = req.body;
      const user = await this.userService.updateUser(req.params.id, userData);

      res
        .status(200)
        .json(ApiResponse.success(UserTransformer.toBriefUser(user)));
    } catch (error) {
      next(error);
    }
  }
}
