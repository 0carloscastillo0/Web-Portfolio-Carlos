import { Router } from "express";
import socialLinkController from "./socialLink.controller";
import { validate } from "../../middlewares/validate.middleware";
import { socialLinkCreateSchema, socialLinkUpdateSchema, userIdParamSchema, userSocialLinkParamSchema } from "./socialLink.schema";
import { authenticate, authorizeOwner } from "../../middlewares/auth.middleware";

// Router for user-related endpoints
const socialLinkRouter = Router();

// Create a new social link with validations
socialLinkRouter.post("/users/:userId/social-links", authenticate, authorizeOwner("userId"), validate(userIdParamSchema, "params"), validate(socialLinkCreateSchema, "body"), socialLinkController.createSocialLink);

// Get all social links for an user with validation of userId parameter
socialLinkRouter.get("/users/:userId/social-links", validate(userIdParamSchema, "params"), socialLinkController.getAllSocialLinksByUserId);

// Update social link by ID with validation of userId and socialLinkId parameters
socialLinkRouter.put("/users/:userId/social-links/:socialLinkId", authenticate, authorizeOwner("userId"), validate(userSocialLinkParamSchema, "params"), validate(socialLinkUpdateSchema, "body"), socialLinkController.updateSocialLink);

// Delete social link by ID with validation of userId and socialLinkId parameters
socialLinkRouter.delete("/users/:userId/social-links/:socialLinkId", authenticate, authorizeOwner("userId"), validate(userSocialLinkParamSchema, "params"), socialLinkController.deleteSocialLink);

export default socialLinkRouter;
