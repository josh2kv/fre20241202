import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { ValidationError } from "@/shared/errors";
import { plainToInstance } from "class-transformer";

export const validateDto = (dtoClass: any, type: "body" | "query" = "body") => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(dtoClass, req[type]);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      const errorMessages = errors.map((error) => ({
        property: error.property,
        constraints: error.constraints,
      }));
      return next(new ValidationError(errorMessages));
    } else {
      req[type] = dtoInstance;
      next();
    }
  };
};
