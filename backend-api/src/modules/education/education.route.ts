import { Router } from "express";
import educationController from "./education.controller";
import { validate } from "../../middlewares/validate.middleware";
import { educationCreateSchema, educationUpdateSchema, userIdParamSchema, userEducationParamSchema } from "./education.schema";
import { authenticate, authorizeOwner } from "../../middlewares/auth.middleware";

// Router for user-related endpoints
const educationRouter = Router();

// Create a new education with validations
educationRouter.post("/users/:userId/educations", authenticate, authorizeOwner("userId"), validate(userIdParamSchema, "params") , validate(educationCreateSchema, "body"), educationController.createEducation);

// Get all educations for an user with validation of userId parameter
educationRouter.get("/users/:userId/educations", validate(userIdParamSchema, "params"), educationController.getAllEducationsByUserId);

// Update education by ID with validation of userId and educationId parameters
educationRouter.put("/users/:userId/educations/:educationId", authenticate, authorizeOwner("userId"), validate(userEducationParamSchema, "params"), validate(educationUpdateSchema, "body"), educationController.updateEducation);

// Delete education by ID with validation of userId and educationId parameters
educationRouter.delete("/users/:userId/educations/:educationId", authenticate, authorizeOwner("userId"), validate(userEducationParamSchema, "params"), educationController.deleteEducation);

export default educationRouter;
