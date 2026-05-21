import { Router } from "express";
import authController from "./auth.controller";
import { validate } from "../../middlewares/validate.middleware";
import { registerSchema, loginSchema, refreshTokenSchema, logoutSchema, changePasswordSchema } from "./auth.schema";
import { authenticate } from "../../middlewares/auth.middleware";

const authRouter = Router();

// Register a new user with a hashed password
authRouter.post("/register", validate(registerSchema, "body"), authController.register);

// Login user and generate access/refresh tokens
authRouter.post("/login", validate(loginSchema, "body"), authController.login);

// Refresh an expired access token using a refresh token sent in JSON body
authRouter.post("/refresh-token", validate(refreshTokenSchema, "body"), authController.refreshToken);

// Logout user by invalidating the refresh token/session
authRouter.post("/logout", validate(logoutSchema, "body"), authController.logout);

// Get authenticated user information using Bearer access token
authRouter.get("/me", authenticate, authController.me);

// Change authenticated user password and invalidate refresh token session
authRouter.patch("/change-password", authenticate, validate(changePasswordSchema, "body"), authController.changePassword);

export default authRouter;
