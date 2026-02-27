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
        // Extract skillIds from the input data
        const { skillIds, ...projectData } = data; 

        // Validate that the user exists
        const existingUser = await prisma.user.findUnique({
            where: { id: data.userId },
        });
        if (!existingUser) throw new AppError("User not found", 404);

        // Validate that skills exist and belong to the user if skillIds are provided
        if (skillIds && skillIds.length > 0) {
            const existingSkills = await prisma.skill.findMany({
                where: {
                    id: { in: skillIds },
                    userId: projectData.userId
                }
            });
            if (existingSkills.length !== skillIds.length) {
                throw new AppError("Some skills do not exist or do not belong to this user", 400);
            }
        }

        // Create the new project and associate it with the skills if skillIds are provided
        const newProject = await prisma.project.create({ 
            data: {
                ...projectData,
                skills: skillIds
                    ? {
                        create: skillIds.map((skillId: number) => ({
                            skill: {
                                connect: { id: skillId }
                            }
                        }))
                    }
                    : undefined
            },
            include: {
                skills: {
                    include: {
                        skill: true
                    }
                }
            }
         });
         
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

        // Get all projects for the user, only select the necessary fields.
        const projects = await prisma.project.findMany({
            where: { userId: idUser },
            select: {
                id: true,
                title: true,
                startDate: true,
                endDate: true,
                skills: {
                    select: {
                        skill: {
                            select: {
                                id: true,
                                name: true,
                                category: true,
                                icon: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                startDate: "desc"
            }
        });

        return projects.map(project => ({
            id: project.id,
            title: project.title,
            startDate: project.startDate,
            endDate: project.endDate,
            skills: project.skills.map(sp => sp.skill)
        }));
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
            include: {
                skills: {
                    include: {
                        skill: true
                    }
                }
            }
        });

        // If project not found or does not belong to the user, throw an error
        if (!project) throw new AppError("Project not found for this user", 404);

        return project;
    },    

    /* 
    Method to add one or more images to a project.
    Input: Project ID as a parameter, image file/s in the request body.
    Output: Updated project object with the new image/s, or error message if project not found or if project does not belong to the user.
    */
    addImageToProject: async (projectId: number, files?: Express.Multer.File[]) => {

        // Validate that files are provided
        if (!files || files.length === 0) {
            throw new AppError("No image files provided", 400);
        }

        // Validate that the project exists
        const project = await prisma.project.findUnique({
            where: { id: projectId }
        });
        if (!project) {
            throw new AppError("Project not found", 404);
        }

        // Create image records for each uploaded file and associate them with the project
        const images = await Promise.all(
            files.map((file, index) =>
                prisma.imgProject.create({
                    data: {
                        url: `/uploads/projects/${file.filename}`,
                        filename: file.filename,
                        size: file.size,
                        mimeType: file.mimetype,
                        projectId: projectId,
                        order: index
                    }
                })
            )
        );

        return images;
    },

    /* 
    Method to get images for a project.
    Input: Project ID as a parameter.
    Output: Array of image objects for the specified project, or error message if project not found or if project does not belong to the user.
    */
    getImagesForProject: async (projectId: number) => {
        // Validate that the project exists
        const project = await prisma.project.findUnique({
            where: { id: projectId }
        });
        if (!project) {
            throw new AppError("Project not found", 404);
        }

        // Get images for the project, ordered by the 'order' field
        const images = await prisma.imgProject.findMany({
            where: { projectId: projectId },
            orderBy: { order: "asc" }
        });

        return images;
    }
};

export default projectService;