import { Request, Response } from "express";
import authService from "./auth.service";
import { asyncHandler } from "../../utils/asyncHanfler";
import { sendResponse } from "../../utils/response";

const authController = {

    /*
    Method to register a new user with password hashing.
    Input: JSON body with user profile fields and password.
    Output: Created public user data.
    */
    register: asyncHandler(async (req: Request, res: Response) => {
        const user = await authService.register(req.body);
        sendResponse(res, 201, "User registered successfully", user);
    }),

    /*
    Method to login a user and issue JWT tokens.
    Input: Email and password.
    Output: Public user data, access token and refresh token.
    */
    login: asyncHandler(async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const authData = await authService.login(email, password);
        sendResponse(res, 200, "Login successful", authData);
    }),

    /*
    Method to refresh an expired access token using a refresh token from JSON body.
    Input: Refresh token.
    Output: New access token.
    */
    refreshToken: asyncHandler(async (req: Request, res: Response) => {
        const tokenData = await authService.refreshToken(req.body.refreshToken);
        sendResponse(res, 200, "Access token refreshed successfully", tokenData);
    }),

    /*
    Method to logout a user by invalidating the refresh token stored in database.
    Input: Refresh token.
    Output: Success message.
    */
    logout: asyncHandler(async (req: Request, res: Response) => {
        await authService.logout(req.body.refreshToken);
        sendResponse(res, 200, "Logged out successfully", null);
    }),

    /*
    Method to get authenticated user information.
    Input: Bearer access token in Authorization header.
    Output: Public authenticated user data.
    */
    me: asyncHandler(async (req: Request, res: Response) => {
        const userId = req.user?.userId;
        const user = await authService.me(Number(userId));
        sendResponse(res, 200, "Authenticated user retrieved successfully", user);
    }),

    /*
    Method to change the password of an authenticated user.
    Input: Bearer access token and JSON body with currentPassword and newPassword.
    Output: Success message and invalidated refresh token session.
    */
    changePassword: asyncHandler(async (req: Request, res: Response) => {
        const userId = Number(req.user?.userId);
        const { currentPassword, newPassword } = req.body;
        await authService.changePassword(userId, currentPassword, newPassword);
        sendResponse(res, 200, "Password changed successfully", null);
    }),
};

export default authController;
