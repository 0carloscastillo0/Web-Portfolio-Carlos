import { Router } from "express";
import contactController from "../controllers/contact.controller";
import { validate } from "../middlewares/validate.middleware";
import { contactCreateSchema, userIdParamSchema } from "../schemas/contact.schema";

// Router for user-related endpoints
const contactRouter = Router();

// Create a new contact with validations
contactRouter.post("/users/:userId/contacts", validate(userIdParamSchema, "params") , validate(contactCreateSchema, "body"), contactController.createContact);

// Get all contacts for an user with validation of userId parameter
contactRouter.get("/users/:userId/contacts", validate(userIdParamSchema, "params"), contactController.getAllContactsByUserId);

// Additional routes (getOne, update, delete) can be added here in the future

export default contactRouter;