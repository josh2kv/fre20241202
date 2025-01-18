import { Router } from "express";
import { UserController } from "./user.controller";
import { validateDto } from "@/shared/middlewares/validation.middleware";
import { CreateUserDto } from "./user.dto";
import { ROUTE_SEGMENT } from "@/config/routes";

const router = Router();
const userController = new UserController();

router.post(
  ROUTE_SEGMENT.ROOT,
  validateDto(CreateUserDto),
  userController.createUser.bind(userController)
);

export default router;
