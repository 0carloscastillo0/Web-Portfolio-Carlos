import { Request, Response, NextFunction } from "express";

// This automatically captures async errors and sends them to the global middleware.
export const asyncHandler = (fn: any) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };