import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { UnauthorizedError } from "../errors";

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
