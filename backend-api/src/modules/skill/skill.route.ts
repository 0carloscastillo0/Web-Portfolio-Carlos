import { Router } from "express";
import skillController from "./skill.controller";
import { validate } from "../../middlewares/validate.middleware";
import { skillCreateSchema, skillUpdateSchema, userIdParamSchema, userSkillParamSchema } from "./skill.schema";

// Router for user-related endpoints
const skillRouter = Router();

// Create a new skill with validations
skillRouter.post("/users/:userId/skills", validate(userIdParamSchema, "params") , validate(skillCreateSchema, "body"), skillController.createSkill);

// Get all skills for an user with validation of userId parameter
skillRouter.get("/users/:userId/skills", validate(userIdParamSchema, "params"), skillController.getAllSkillsByUserId);

// Update skill by ID with validation of userId and skillId parameters
skillRouter.put("/users/:userId/skills/:skillId", validate(userSkillParamSchema, "params"), validate(skillUpdateSchema, "body"), skillController.updateSkill);

// Delete skill by ID with validation of userId and skillId parameters
skillRouter.delete("/users/:userId/skills/:skillId", validate(userSkillParamSchema, "params"), skillController.deleteSkill);

export default skillRouter;