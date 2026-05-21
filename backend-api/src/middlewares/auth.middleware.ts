import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError";

type AuthPayload = {
    userId: number;
    email: string;
};

declare global {
    namespace Express {
        interface Request {
            user?: AuthPayload;
        }
    }
}

/*
Middleware to protect routes using a Bearer access token.
Input: Authorization header with format "Bearer <token>".
Output: Adds decoded user payload to req.user or throws an auth error.
*/
export const authenticate = (req: Request, _res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new AppError("Authorization token required", 401));
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET || "dev-access-secret") as AuthPayload;
        req.user = decoded;
        return next();
    } catch {
        return next(new AppError("Invalid or expired access token", 401));
    }
};

/*
Middleware to ensure the authenticated user owns the resource identified in URL params.
Input: Param name containing the user ID (for example "id" or "userId").
Output: Allows the request only when JWT userId matches the route param.
*/
export const authorizeOwner = (paramName: "id" | "userId" = "userId") => {
    return (req: Request, _res: Response, next: NextFunction) => {
        const tokenUserId = req.user?.userId;
        const paramUserId = Number(req.params[paramName]);

        if (!tokenUserId || tokenUserId !== paramUserId) {
            return next(new AppError("You are not allowed to access this resource", 403));
        }

        return next();
    };
};
