import { Router } from "express";
import { AuthController } from "./auth.controller";
import { LoginDto, RefreshTokenDto, RegisterDto } from "./auth.dto";
import { validateDto } from "@/shared/middlewares/validation.middleware";
import { ROUTE_SEGMENT } from "@/config/routes";

const router = Router();
const authController = new AuthController();

router.post(
  ROUTE_SEGMENT.AUTH.LOGIN,
  validateDto(LoginDto),
  authController.login.bind(authController)
);

router.post(
  ROUTE_SEGMENT.AUTH.REGISTER,
  validateDto(RegisterDto),
  authController.register.bind(authController)
);

router.post(
  ROUTE_SEGMENT.AUTH.REFRESH_TOKEN,
  validateDto(RefreshTokenDto),
  authController.refreshToken.bind(authController)
);

export default router;
