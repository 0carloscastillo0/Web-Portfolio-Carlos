import { Router } from "express";
import userController from "./user.controller";
import { validate } from "../../middlewares/validate.middleware";
import { userUpdateSchema, userIdParamSchema } from "./user.schema";
import { uploadUserCV, uploadUserImage } from "../../utils/multer";
import { authenticate, authorizeOwner } from "../../middlewares/auth.middleware";

// Router for user-related endpoints
const userRouter = Router();

// Get user by ID
userRouter.get("/:id", validate(userIdParamSchema, "params"), userController.getUserById);

// Update user (excludes urlCV and urlPhoto)
userRouter.put("/:id", authenticate, authorizeOwner("id"), validate(userIdParamSchema, "params"), validate(userUpdateSchema, "body"), userController.updateUser);

// Create image for user
userRouter.post("/:id/photo", authenticate, authorizeOwner("id"), validate(userIdParamSchema, "params"), uploadUserImage.single("image"), userController.uploadUserPhoto);

// Upload CV for user 
userRouter.post("/:id/cv", authenticate, authorizeOwner("id"), validate(userIdParamSchema, "params"), uploadUserCV.single("cv"), userController.uploadUserCV);

export default userRouter;
