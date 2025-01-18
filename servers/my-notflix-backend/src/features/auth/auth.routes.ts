import { Router } from "express";
import { AuthController } from "./auth.controller";
import { LoginDto, RegisterDto } from "./auth.dto";
import { validateDto } from "@/shared/middlewares/validation.middleware";
import { ROUTE_SEGMENT } from "@/config/routes";

const router = Router();
const authController = new AuthController();

router.post(
  ROUTE_SEGMENT.LOGIN,
  validateDto(LoginDto),
  authController.login.bind(authController)
);

router.post(
  ROUTE_SEGMENT.REGISTER,
  validateDto(RegisterDto),
  authController.register.bind(authController)
);

export default router;
