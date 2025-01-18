import { Router } from "express";
import { UserController } from "./user.controller";
import { validateDto } from "@/shared/middlewares/validation.middleware";
import { CreateUserDto, UpdateUserDto } from "./user.dto";
import { ROUTE_SEGMENT } from "@/config/routes";

const router = Router();
const userController = new UserController();

router.post(
  ROUTE_SEGMENT.ROOT,
  validateDto(CreateUserDto),
  userController.createUser.bind(userController)
);

router.patch(
  ROUTE_SEGMENT.ID_PARAM,
  validateDto(UpdateUserDto),
  userController.updateUser.bind(userController)
);

export default router;
