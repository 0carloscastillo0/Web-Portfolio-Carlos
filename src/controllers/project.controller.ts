import { Request, Response } from "express";
import projectService from "../services/project.service";
import { asyncHandler } from "../utils/asyncHanfler";

/// Controller for project-related operations
const projectController = {

    /*
    Method to create a new Project with error handling.
    Input: JSON body with project details.
    Output: Created project object or error message.
    */
    createProject: asyncHandler( async (req: Request, res: Response) => {
        const userId = Number(req.params.userId);
        const project = await projectService.createProject({...req.body, userId: userId});
        res.status(201).json(project);
    }),

    /* 
    Method to get all projects for a user by user ID.
    Input: User ID as a URL parameter.
    Output: Array of project objects for the specified user, or error message if user not found.
    */
    getAllProjectsByUserId: asyncHandler( async (req: Request, res: Response) => {
        const userId = Number(req.params.userId);
        const projects = await projectService.getAllProjectsByUserId(userId);
        res.status(200).json(projects);
    }),

    /* 
    Method to get a project by its ID for a specific user.
    Input: User ID and Project ID as URL parameters.
    Output: Project object if found, or error message if not found or if project does not belong to the user.
    */
    getProjectById: asyncHandler( async (req: Request, res: Response) => {
        const userId = Number(req.params.userId);
        const projectId = Number(req.params.projectId);
        const project = await projectService.getProjectById(userId, projectId);
        res.status(200).json(project);
     }),

};

export default projectController;