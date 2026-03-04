import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

/// Middleware to validate request body against a Joi schema
export const validate = (schema: any, property: "body" | "params" | "query" = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req[property]);

    if (error) return next(new AppError(error.details[0].message, 400));

    req[property] = value;
    next();
};