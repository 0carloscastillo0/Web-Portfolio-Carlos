import { Router } from "express";
import userController from "./user.controller";
import { validate } from "../../middlewares/validate.middleware";
import { userCreateSchema, userUpdateSchema, userIdParamSchema } from "./user.schema";
import { uploadUserCV, uploadUserImage } from "../../utils/multer";

// Router for user-related endpoints
const userRouter = Router();

// Create a new user with validation
userRouter.post("/", validate(userCreateSchema,"body"), userController.createUser);

// Get user by ID
userRouter.get("/:id", validate(userIdParamSchema, "params"), userController.getUserById);

// Update user (excludes urlCV and urlPhoto)
userRouter.put("/:id", validate(userIdParamSchema, "params"), validate(userUpdateSchema, "body"), userController.updateUser);

// Create image for user
userRouter.post("/:id/photo", validate(userIdParamSchema, "params"), uploadUserImage.single("image"), userController.uploadUserPhoto);

// Upload CV for user 
userRouter.post("/:id/cv", validate(userIdParamSchema, "params"), uploadUserCV.single("cv"), userController.uploadUserCV);

export default userRouter;