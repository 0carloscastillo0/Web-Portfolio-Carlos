import { prisma } from "../config/prisma";
import { AppError } from "../utils/AppError";

// Service for project-related operations
const projectService = {

    /* 
    Method to create a new project from idUser.
    Input: JSON body with project details (title, startDate, endDate, description, userId).
    Output: Created project object or error message.
    */
    createProject: async (data: any) => {
        // Validate that the user exists
        const existingUser = await prisma.user.findUnique({
            where: { id: data.userId },
        });
        if (!existingUser) throw new AppError("User not found", 404);

        // Create the new project
        const newProject = await prisma.project.create({ data });
        return newProject;
    },

    /* 
    Method to get all projects for a user by user ID.
    Input: User ID as a parameter.
    Output: Array of project objects for the specified user, or error message if user not found.
    */
    getAllProjectsByUserId: async (idUser: number) => {
        // Validate that the user exists
        const existingUser = await prisma.user.findUnique({
            where: { id: idUser },
        });
        if (!existingUser) throw new AppError("User not found", 404);

        // Get all projects for the user
        const projects = await prisma.project.findMany({
            where: { userId: idUser },
        });

        return projects;
    },

    /* 
    Method to get a project by its ID for a specific user.
    Input: User ID and Project ID as parameters.
    Output: Project object if found, or error message if not found or if project does not belong to the user.
    */
    getProjectById: async (idUser: number, idProject: number) => {
        // Validate that the user exists
        const existingUser = await prisma.user.findUnique({
            where: { id: idUser },
        });
        if (!existingUser) throw new AppError("User not found", 404);

        // Get the project by ID and user ID
        const project = await prisma.project.findFirst({
            where: { id: idProject, userId: idUser },
        });

        // If project not found or does not belong to the user, throw an error
        if (!project) throw new AppError("Project not found for this user", 404);

        return project;
     }
};

export default projectService;