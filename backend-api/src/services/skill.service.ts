import { prisma } from "../config/prisma";
import { AppError } from "../utils/AppError";

/// Service for user-related operations
const skillService = {

    /* 
    Method to create a new skill from idUser.
    Input: JSON body with skill details (name, category, icon, userId).
    Output: Created skill object or error message.
    */
    createSkill: async (data: any) => {
        // Validate that the user exists
        const existingUser = await prisma.user.findUnique({
            where: { id: data.userId },
        });
        if (!existingUser) throw new AppError("User not found", 404);

        // Create the new skill
        const newSkill = await prisma.skill.create({ data });
        return newSkill;
    },

    /* 
    Method to get all skills for a user by user ID.
    Input: User ID as a parameter.
    Output: Array of skill objects for the specified user, or error message if user not found.
    */
    getAllSkillsByUserId: async (idUser: number) => {
        // Validate that the user exists
        const existingUser = await prisma.user.findUnique({
            where: { id: idUser },
        });
        if (!existingUser) throw new AppError("User not found", 404);

        // Get all skills for the user
        const skills = await prisma.skill.findMany({
            where: { userId: idUser },
        });

        return skills;
    }

};

export default skillService;