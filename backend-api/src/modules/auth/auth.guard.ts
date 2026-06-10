import { NextFunction, Request, Response } from "express";
import { AppError } from "../../utils/AppError";

/*
Middleware to conditionally disable user registration in production.
Input: ENABLE_REGISTER and NODE_ENV environment variables.
Output: Allows or blocks the register request.
*/
export const ensureRegisterEnabled = (_req: Request, _res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV === "production" && process.env.ENABLE_REGISTER !== "true") {
        return next(new AppError("Register is disabled", 403));
    }

    return next();
};
