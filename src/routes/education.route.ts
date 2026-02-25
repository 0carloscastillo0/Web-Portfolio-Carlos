import { Router } from "express";
import educationController from "../controllers/education.controller";
import { validate } from "../middlewares/validate.middleware";
import { educationCreateSchema, userIdParamSchema } from "../schemas/education.schema";

// Router for user-related endpoints
const userRouter = Router();

// Create a new education with validations
userRouter.post("/users/:userId/educations", validate(userIdParamSchema, "params") , validate(educationCreateSchema, "body"), educationController.createEducation);

// Get all educations for an user with validation of userId parameter
userRouter.get("/users/:userId/educations", validate(userIdParamSchema, "params"), educationController.getAllEducationsByUserId);

// Additional routes (getOne, update, delete) can be added here in the future

export default userRouter;