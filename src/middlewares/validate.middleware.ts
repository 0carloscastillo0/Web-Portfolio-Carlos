import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

/// Middleware to validate request body against a Joi schema
export const validate = (schema: ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {

    const { error, value } = schema.validate(req.body);

    if (error) return res.status(400).json({ message: error.details[0].message});

    req.body = value;
    next();
};