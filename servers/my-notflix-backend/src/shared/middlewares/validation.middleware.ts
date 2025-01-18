import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { ValidationError } from "../errors";

export const validateDto = (dtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(dtoClass, req.body);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      const formattedErrors = errors.map((error) => ({
        field: error.property,
        constraints: Object.values(error.constraints || {}),
      }));

      next(new ValidationError("Validation failed", formattedErrors));
    } else {
      req.body = dtoInstance;
      next();
    }
  };
};
