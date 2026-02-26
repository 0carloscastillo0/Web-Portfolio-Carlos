import { Router } from "express";
import projectController from "../controllers/project.controller";
import { validate } from "../middlewares/validate.middleware";
import { projectCreateSchema, paramsSchemas } from "../schemas/project.schema";

// Router for user-related endpoints
const projectRouter = Router();

// Create a new project with validations
projectRouter.post("/users/:userId/projects", validate(paramsSchemas.userId, "params") , validate(projectCreateSchema, "body"), projectController.createProject);

// Get all projects for an user with validation of userId parameter
projectRouter.get("/users/:userId/projects", validate(paramsSchemas.userId, "params"), projectController.getAllProjectsByUserId);

// Get project by ID with validation of projectId parameter
projectRouter.get("/users/:userId/projects/:projectId", validate(paramsSchemas.userProject, "params"), projectController.getProjectById);

// Additional routes (update, delete) can be added here in the future

export default projectRouter;