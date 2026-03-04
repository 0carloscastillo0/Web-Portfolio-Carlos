import { Router } from "express";
import userController from "../controllers/user.controller";
import { validate } from "../middlewares/validate.middleware";
import { userCreateSchema } from "../schemas/user.schema";
import { uploadUserCV, uploadUserImage } from "../utils/multer";

// Router for user-related endpoints
const userRouter = Router();

// Create a new user with validation
userRouter.post("/", validate(userCreateSchema,"body"), userController.createUser);

// Get user by ID
userRouter.get("/:id", userController.getUserById);

// Create image for user
userRouter.post("/:id/photo", uploadUserImage.single("image"), userController.uploadUserPhoto);

// Upload CV for user 
userRouter.post("/:id/cv", uploadUserCV.single("cv"), userController.uploadUserCV);

// Additional routes (update, delete) can be added here in the future

export default userRouter;