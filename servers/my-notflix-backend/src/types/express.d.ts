import { User as UserModel } from "@/features/users/user.model";
import { Request } from "express";

declare global {
  namespace Express {
    interface User extends UserModel {}
  }
}
