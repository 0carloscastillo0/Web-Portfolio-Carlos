import { Router } from "express";
import skillController from "../controllers/skill.controller";
import { validate } from "../middlewares/validate.middleware";
import { skillCreateSchema, userIdParamSchema } from "../schemas/skill.schema";

// Router for user-related endpoints
const skillRouter = Router();

// Create a new skill with validations
skillRouter.post("/users/:userId/skills", validate(userIdParamSchema, "params") , validate(skillCreateSchema, "body"), skillController.createSkill);

// Get all skills for an user with validation of userId parameter
skillRouter.get("/users/:userId/skills", validate(userIdParamSchema, "params"), skillController.getAllSkillsByUserId);

// Additional routes (getOne, update, delete) can be added here in the future

export default skillRouter;