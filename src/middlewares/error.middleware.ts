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

  // Custom application errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  // Multer errors (e.g., size limit)
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      status: "error",
      message: err.message,
    });
  }

  // Unknown error
  console.error(err);

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};