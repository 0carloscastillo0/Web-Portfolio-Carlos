import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

// Middleware to handle errors in the application
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  // Error control for known application errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  // Error control for unknown errors
  console.error(err);

  return res.status(500).json({
    message: "Internal server error",
  });
};