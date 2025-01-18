import { Request, Response, NextFunction } from "express";
import { AppError } from "@/shared/errors";
import { ApiResponse } from "../utils/api-response";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json(ApiResponse.error(error.message, error.errors));
  }

  console.error(error);
  return res.status(500).json(ApiResponse.error("Internal server error"));
};
