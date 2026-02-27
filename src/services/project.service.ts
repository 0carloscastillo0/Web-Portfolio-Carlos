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
     }
};

export default projectService;