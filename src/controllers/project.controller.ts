import { Request, Response } from "express";
import projectService from "../services/project.service";
import { asyncHandler } from "../utils/asyncHanfler";
import { sendResponse } from "../utils/response";

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
        sendResponse(res, 201, "Project created successfully", project);
    }),

    /* 
    Method to get all projects for a user by user ID.
    Input: User ID as a URL parameter.
    Output: Array of project objects for the specified user, or error message if user not found.
    */
    getAllProjectsByUserId: asyncHandler( async (req: Request, res: Response) => {
        const userId = Number(req.params.userId);
        const projects = await projectService.getAllProjectsByUserId(userId);
        sendResponse(res, 200, "Projects retrieved successfully", projects);
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
        sendResponse(res, 200, "Project retrieved successfully", project);
     }),

    /* 
    Method to add one or more images to a project for a specific user.
    Input: User ID and Project ID as URL parameters, image/s file/s in the request body.
    Output: Updated project object with the new image/s, or error message if project not found or if project does not belong to the user.
    */
    addImageToProject: asyncHandler(async (req: Request, res: Response) => {
        const userId = Number(req.params.userId);
        const projectId = Number(req.params.projectId);
        const files = req.files as Express.Multer.File[];
        const images = await projectService.addImageToProject(userId, projectId, files);
        sendResponse(res, 201, "Image(s) added to project successfully", images);
    }),

    /* 
    Method to get images for a project for a specific user.
    Input: User ID and Project ID as URL parameters.
    Output: Array of image objects for the specified project, or error message if project not found or if project does not belong to the user.
    */
    getImagesForProject: asyncHandler(async (req: Request, res: Response) => {
        const userId = Number(req.params.userId);
        const projectId = Number(req.params.projectId);
        const images = await projectService.getImagesForProject(userId, projectId);
        sendResponse(res, 200, "Images retrieved successfully", images);
    }),

};

export default projectController;