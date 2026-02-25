import { prisma } from "../config/prisma";
import { AppError } from "../utils/AppError";

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
    }

};

export default educationService;