import { Router } from "express";
import projectController from "../controllers/project.controller";
import { validate } from "../middlewares/validate.middleware";
import { projectCreateSchema, paramsSchemas } from "../schemas/project.schema";
import { uploadProjectImage } from "../utils/multer";

// Router for user-related endpoints
const projectRouter = Router();

// Create a new project with validations
projectRouter.post("/users/:userId/projects", validate(paramsSchemas.userId, "params") , validate(projectCreateSchema, "body"), projectController.createProject);

// Get all projects for an user with validation of userId parameter
projectRouter.get("/users/:userId/projects", validate(paramsSchemas.userId, "params"), projectController.getAllProjectsByUserId);

// Get project by ID with validation of projectId parameter
projectRouter.get("/users/:userId/projects/:projectId", validate(paramsSchemas.userProject, "params"), projectController.getProjectById);

// Create one or more images for a project with validation of projectId parameter
projectRouter.post("/users/:userId/projects/:projectId/images", validate(paramsSchemas.userProject, "params"), uploadProjectImage.array("images",10), projectController.addImageToProject);

// Get images for a project with validation of projectId parameter
projectRouter.get("/users/:userId/projects/:projectId/images", validate(paramsSchemas.userProject, "params"), projectController.getImagesForProject);

// Additional routes (update, delete) can be added here in the future

export default projectRouter;