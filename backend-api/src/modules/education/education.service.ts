import { prisma } from "../../config/prisma";
import { AppError } from "../../utils/AppError";

/// Service for user-related operations
const educationService = {

    /* 
    Method to create a new education from idUser.
    Input: JSON body with education details (place, name, startDate, endDate, description, userId).
    Output: Created education object or error message.
    */
    createEducation: async (data: any) => {
        // Validate that the user exists
        const existingUser = await prisma.user.findUnique({
            where: { id: data.userId },
        });
        if (!existingUser) throw new AppError("User not found", 404);

        // Create the new education
        const newEducation = await prisma.education.create({ data });
        return newEducation;
    },

/*
    Method to get all educations for a user by user ID.
    Input: User ID as a parameter.
    Output: Array of education objects for the specified user, or error message if user not found.
    */
    getAllEducationsByUserId: async (idUser: number) => {
        // Validate that the user exists
        const existingUser = await prisma.user.findUnique({
            where: { id: idUser },
        });
        if (!existingUser) throw new AppError("User not found", 404);

        // Get all educations for the user
        const educations = await prisma.education.findMany({
            where: { userId: idUser },
        });

        return educations;
    },

    /*
    Method to update an existing education for a specific user.
    Input: User ID, Education ID, and JSON body with education details to update.
    Output: Updated education object or error message if education not found or does not belong to the user.
    */
    updateEducation: async (userId: number, educationId: number, data: any) => {
        // Validate that the user exists
        const existingUser = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!existingUser) throw new AppError("User not found", 404);

        // Validate that the education exists and belongs to the user
        const existingEducation = await prisma.education.findUnique({
            where: { id: educationId, userId: userId }
        });
        if (!existingEducation) {
            throw new AppError("Education not found for this user", 404);
        }

        // Update the education
        const updatedEducation = await prisma.education.update({
            where: { id: educationId },
            data: data,
        });

        return updatedEducation;
    },

    /*
    Method to delete an education for a specific user.
    Input: User ID and Education ID as parameters.
    Output: Success message or error message if education not found or does not belong to the user.
    */
    deleteEducation: async (userId: number, educationId: number) => {
        // Validate that the user exists
        const existingUser = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!existingUser) throw new AppError("User not found", 404);

        // Validate that the education exists and belongs to the user
        const existingEducation = await prisma.education.findUnique({
            where: { id: educationId, userId: userId }
        });
        if (!existingEducation) {
            throw new AppError("Education not found for this user", 404);
        }

        // Delete the education
        await prisma.education.delete({
            where: { id: educationId }
        });

        return { message: "Education deleted successfully" };
    }

};

export default educationService;