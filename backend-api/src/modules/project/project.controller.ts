import { Request, Response } from "express";
import projectService from "./project.service";
import { asyncHandler } from "../../utils/asyncHanfler";
import { sendResponse } from "../../utils/response";

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
    Method to upload images to a project (renamed from addImageToProject).
    Input: User ID and Project ID as URL parameters, image/s file/s in the request body.
    Output: Created image objects or error message if project not found or if project does not belong to the user.
    */
    uploadImageProject: asyncHandler(async (req: Request, res: Response) => {
        const userId = Number(req.params.userId);
        const projectId = Number(req.params.projectId);
        const files = req.files as Express.Multer.File[];
        const images = await projectService.uploadImageProject(userId, projectId, files);
        sendResponse(res, 201, "Image(s) uploaded to project successfully", images);
    }),

    /*
    Method to update an existing project for a specific user.
    Input: User ID and Project ID as URL parameters, JSON body with project details to update.
    Output: Updated project object or error message if project not found or does not belong to the user.
    */
    updateProject: asyncHandler(async (req: Request, res: Response) => {
        const userId = Number(req.params.userId);
        const projectId = Number(req.params.projectId);
        const updatedProject = await projectService.updateProject(userId, projectId, req.body);
        sendResponse(res, 200, "Project updated successfully", updatedProject);
    }),

    /*
    Method to delete a project for a specific user, including associated images from filesystem.
    Input: User ID and Project ID as URL parameters.
    Output: Success message or error message if project not found or does not belong to the user.
    */
    deleteProject: asyncHandler(async (req: Request, res: Response) => {
        const userId = Number(req.params.userId);
        const projectId = Number(req.params.projectId);
        await projectService.deleteProject(userId, projectId);
        sendResponse(res, 200, "Project deleted successfully", null);
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