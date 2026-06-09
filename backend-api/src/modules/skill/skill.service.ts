import { prisma } from "../../config/prisma";
import { AppError } from "../../utils/AppError";

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
    },

    /*
    Method to update an existing skill for a specific user.
    Input: User ID, Skill ID, and JSON body with skill details to update.
    Output: Updated skill object or error message if skill not found or does not belong to the user.
    */
    updateSkill: async (userId: number, skillId: number, data: any) => {
        // Validate that the user exists
        const existingUser = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!existingUser) throw new AppError("User not found", 404);

        // Validate that the skill exists and belongs to the user
        const existingSkill = await prisma.skill.findUnique({
            where: { id: skillId, userId: userId }
        });
        if (!existingSkill) {
            throw new AppError("Skill not found for this user", 404);
        }

        // Update the skill
        const updatedSkill = await prisma.skill.update({
            where: { id: skillId },
            data: data,
        });

        return updatedSkill;
    },

    /*
    Method to delete a skill for a specific user.
    Input: User ID and Skill ID as parameters.
    Output: Success message or error message if skill not found or does not belong to the user.
    */
    deleteSkill: async (userId: number, skillId: number) => {
        // Validate that the user exists
        const existingUser = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!existingUser) throw new AppError("User not found", 404);

        // Validate that the skill exists and belongs to the user
        const existingSkill = await prisma.skill.findUnique({
            where: { id: skillId, userId: userId }
        });
        if (!existingSkill) {
            throw new AppError("Skill not found for this user", 404);
        }

        // Delete associated skill projects first (no cascade delete on this relation)
        await prisma.skillProject.deleteMany({
            where: { skillId: skillId }
        });

        // Delete the skill
        await prisma.skill.delete({
            where: { id: skillId }
        });

        return { message: "Skill deleted successfully" };
    }

};

export default skillService;