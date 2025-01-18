import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { ForbiddenError, UnauthorizedError } from "@/shared/errors";
import { UserRole } from "@/types";
import { ObjectId } from "mongodb";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("jwt", { session: false }, (err: any, user: any) => {
    if (err || !user) return next(new UnauthorizedError());

    req.user = user;
    return next();
  })(req, res, next);
};

export const requireRole = (roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated())
      return next(new UnauthorizedError("User not authenticated"));

    if (!roles.includes(req.user.role)) {
      return next(new ForbiddenError("Insufficient permissions"));
    }
    next();
  };
};

export const requireSelf = (userId: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated())
      return next(new UnauthorizedError("User not authenticated"));

    if (req.user._id.toString() !== userId)
      return next(
        new ForbiddenError("You are not allowed to access this resource")
      );

    next();
  };
};
