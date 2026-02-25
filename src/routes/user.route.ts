import { Router } from "express";
import userController from "../controllers/user.controller";
import { validate } from "../middlewares/validate.middleware";
import { userCreateSchema } from "../schemas/user.schema";

// Router for user-related endpoints
const userRouter = Router();

// POST /users - Create a new user with validation
userRouter.post("/", validate(userCreateSchema), userController.createUser);

export default userRouter;