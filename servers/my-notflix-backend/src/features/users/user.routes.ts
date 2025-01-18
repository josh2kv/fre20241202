import { Router } from "express";
import { UserController } from "./user.controller";
import { validateDto } from "@/shared/middlewares/validation.middleware";
import { CreateUserDto, UpdateUserDto } from "./user.dto";
import { ROUTE_SEGMENT } from "@/config/routes";
import { requireRole } from "@/shared/middlewares/auth.middleware";
import { UserRole } from "@/types";

const router = Router();
const userController = new UserController();

router.post(
  "/",
  requireRole([UserRole.ADMIN]),
  validateDto(CreateUserDto),
  userController.createUser.bind(userController)
);

router.patch(
  ROUTE_SEGMENT.ID_PARAM,
  requireRole([UserRole.ADMIN]),
  validateDto(UpdateUserDto),
  userController.updateUser.bind(userController)
);

export default router;
