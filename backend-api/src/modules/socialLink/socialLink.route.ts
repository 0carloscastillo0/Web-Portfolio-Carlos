import { Router } from "express";
import socialLinkController from "./socialLink.controller";
import { validate } from "../../middlewares/validate.middleware";
import { socialLinkCreateSchema, userIdParamSchema } from "./socialLink.schema";

// Router for user-related endpoints
const socialLinkRouter = Router();

// Create a new social link with validations
socialLinkRouter.post("/users/:userId/social-links", validate(userIdParamSchema, "params"), validate(socialLinkCreateSchema, "body"), socialLinkController.createSocialLink);

// Get all social links for an user with validation of userId parameter
socialLinkRouter.get("/users/:userId/social-links", validate(userIdParamSchema, "params"), socialLinkController.getAllSocialLinksByUserId);

// Additional routes (getOne, update, delete) can be added here in the future

export default socialLinkRouter;