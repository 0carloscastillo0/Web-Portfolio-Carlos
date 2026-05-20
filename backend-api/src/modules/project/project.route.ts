import { Router } from "express";
import projectController from "./project.controller";
import { validate } from "../../middlewares/validate.middleware";
import { projectCreateSchema, projectUpdateSchema, paramsSchemas } from "./project.schema";
import { uploadProjectImage } from "../../utils/multer";

// Router for user-related endpoints
const projectRouter = Router();

// Create a new project with validations
projectRouter.post("/users/:userId/projects", validate(paramsSchemas.userId, "params") , validate(projectCreateSchema, "body"), projectController.createProject);

// Get all projects for an user with validation of userId parameter
projectRouter.get("/users/:userId/projects", validate(paramsSchemas.userId, "params"), projectController.getAllProjectsByUserId);

// Get project by ID with validation of projectId parameter
projectRouter.get("/users/:userId/projects/:projectId", validate(paramsSchemas.userProject, "params"), projectController.getProjectById);

// Update project by ID with validation of projectId parameter
projectRouter.put("/users/:userId/projects/:projectId", validate(paramsSchemas.userProject, "params"), validate(projectUpdateSchema, "body"), projectController.updateProject);

// Delete project by ID with validation of projectId parameter
projectRouter.delete("/users/:userId/projects/:projectId", validate(paramsSchemas.userProject, "params"), projectController.deleteProject);

// Upload images to a project (renamed from addImageToProject)
projectRouter.post("/users/:userId/projects/:projectId/images", validate(paramsSchemas.userProject, "params"), uploadProjectImage.array("images",10), projectController.uploadImageProject);

// Get images for a project with validation of projectId parameter
projectRouter.get("/users/:userId/projects/:projectId/images", validate(paramsSchemas.userProject, "params"), projectController.getImagesForProject);

export default projectRouter;