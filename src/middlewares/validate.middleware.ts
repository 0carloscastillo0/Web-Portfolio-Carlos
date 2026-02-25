import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

/// Middleware to validate request body against a Joi schema
export const validate = (schema: any, property: "body" | "params" | "query" = "body") =>
  (req: any, res: any, next: any) => {

    const { error, value } = schema.validate(req[property]);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    req[property] = value;
    next();
  };