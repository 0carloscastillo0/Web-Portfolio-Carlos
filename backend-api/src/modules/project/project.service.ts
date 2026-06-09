import { prisma } from "../../config/prisma";
import { AppError } from "../../utils/AppError";
import { uploadImage, deleteCloudinaryFile } from "../../utils/cloudinary";

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
    Method to get images for a project for a specific user.
    Input: User ID and Project ID as parameters.
    Output: Array of image objects for the specified project, or error message if project not found or if project does not belong to the user.
    */
    getImagesForProject: async (userId: number, projectId: number) => {
        // Validate that the user exists
        const existingUser = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!existingUser) throw new AppError("User not found", 404);

        // Validate that the project exists and belongs to the user
        const project = await prisma.project.findUnique({
            where: { id: projectId, userId: userId }
        });
        if (!project) {
            throw new AppError("Project not found for this user", 404);
        }

        // Get images for the project, ordered by the 'order' field
        const images = await prisma.imgProject.findMany({
            where: { projectId: projectId },
            orderBy: { order: "asc" }
        });

        return images;
    },

    /*
    Method to update an existing project for a specific user.
    Input: User ID, Project ID, and JSON body with project details to update.
    Output: Updated project object or error message if project not found or does not belong to the user.
    */
    updateProject: async (userId: number, projectId: number, data: any) => {
        // Validate that the user exists
        const existingUser = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!existingUser) throw new AppError("User not found", 404);

        // Validate that the project exists and belongs to the user
        const existingProject = await prisma.project.findUnique({
            where: { id: projectId, userId: userId }
        });
        if (!existingProject) {
            throw new AppError("Project not found for this user", 404);
        }

        // Extract skillIds from the input data
        const { skillIds, ...projectData } = data;

        // Validate that skills exist and belong to the user if skillIds are provided
        if (skillIds && skillIds.length > 0) {
            const existingSkills = await prisma.skill.findMany({
                where: {
                    id: { in: skillIds },
                    userId: userId
                }
            });
            if (existingSkills.length !== skillIds.length) {
                throw new AppError("Some skills do not exist or do not belong to this user", 400);
            }
        }

        // First, delete existing skill associations
        await prisma.skillProject.deleteMany({
            where: { projectId: projectId }
        });

        // Update the project and create new skill associations
        const updatedProject = await prisma.project.update({
            where: { id: projectId },
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

        return updatedProject;
    },

    /*
    Method to delete a project for a specific user, including associated images from Cloudinary.
    Input: User ID and Project ID as parameters.
    Output: Success message or error message if project not found or does not belong to the user.
    */
    deleteProject: async (userId: number, projectId: number) => {
        // Validate that the user exists
        const existingUser = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!existingUser) throw new AppError("User not found", 404);

        // Validate that the project exists and belongs to the user
        const existingProject = await prisma.project.findUnique({
            where: { id: projectId, userId: userId },
            include: {
                images: true
            }
        });
        if (!existingProject) {
            throw new AppError("Project not found for this user", 404);
        }

        // Delete associated image files from Cloudinary
        for (const image of existingProject.images) {
            await deleteCloudinaryFile(image.filename, "image");
        }

        // Delete associated skill projects (SkillProject does not have cascade delete)
        await prisma.skillProject.deleteMany({
            where: { projectId: projectId }
        });

        // Delete the project (images will be cascade deleted due to onDelete: Cascade)
        await prisma.project.delete({
            where: { id: projectId }
        });

        return { message: "Project deleted successfully" };
    },

    /*
    Method to upload images to a project via Cloudinary.
    Input: Project ID as a parameter, image file/s buffers in the request body.
    Output: Array of created image objects, or error message if project not found or if project does not belong to the user.
    */
    uploadImageProject: async (userId: number, projectId: number, files?: Express.Multer.File[]) => {
        // Validate that the user exists        
        const existingUser = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!existingUser) throw new AppError("User not found", 404);

        // Validate that files are provided
        if (!files || files.length === 0) {
            throw new AppError("No image files provided", 400);
        }

        // Validate that the project exists and belongs to the user
        const project = await prisma.project.findUnique({
            where: { id: projectId, userId: userId }
        });
        if (!project) {
            throw new AppError("Project not found for this user", 404);
        }

        // Upload each image to Cloudinary and create records
        const images = await Promise.all(
            files.map(async (file, index) => {
                const result = await uploadImage(file.buffer, "portfolio/projects");

                return prisma.imgProject.create({
                    data: {
                        url: result.secure_url,
                        filename: result.public_id,
                        size: file.size,
                        mimeType: file.mimetype,
                        projectId: projectId,
                        order: index
                    }
                });
            })
        );

        return images;
    }
};

export default projectService;
