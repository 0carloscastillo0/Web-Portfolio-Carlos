import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { AppError } from "../utils/AppError";

// Global error handling middleware
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  let statusCode = 500;
  let message = err.message;

  // AppError instances (custom application errors)
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // Multer errors (e.g., size limit)
  else if (err instanceof multer.MulterError) {
    statusCode = 400;
    message = err.message;
  }

  // Log only non-operational errors for debugging
  if (!(err instanceof AppError)) {
    console.error(err);
  }
  
  return res.status(statusCode).json({
    success: false,
    message,
  });
};