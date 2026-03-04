import { Router } from "express";
import educationController from "../controllers/education.controller";
import { validate } from "../middlewares/validate.middleware";
import { educationCreateSchema, userIdParamSchema } from "../schemas/education.schema";

// Router for user-related endpoints
const educationRouter = Router();

// Create a new education with validations
educationRouter.post("/users/:userId/educations", validate(userIdParamSchema, "params") , validate(educationCreateSchema, "body"), educationController.createEducation);

// Get all educations for an user with validation of userId parameter
educationRouter.get("/users/:userId/educations", validate(userIdParamSchema, "params"), educationController.getAllEducationsByUserId);

// Additional routes (getOne, update, delete) can be added here in the future

export default educationRouter;