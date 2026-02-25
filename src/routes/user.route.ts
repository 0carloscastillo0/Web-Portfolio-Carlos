import { Router } from "express";
import userController from "../controllers/user.controller";
import { validate } from "../middlewares/validate.middleware";
import { userCreateSchema } from "../schemas/user.schema";

// Router for user-related endpoints
const userRouter = Router();

// Create a new user with validation
userRouter.post("/", validate(userCreateSchema), userController.createUser);

// Get user by ID
userRouter.get("/:id", userController.getUserById);

// Additional routes (update, delete) can be added here in the future

export default userRouter;