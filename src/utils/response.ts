import { Response } from "express";

// Utility function to send standardized JSON responses
export const sendResponse = (
    res: Response,
    statusCode: number,
    message = "Operation successful",
    data: any
) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data
    });
};