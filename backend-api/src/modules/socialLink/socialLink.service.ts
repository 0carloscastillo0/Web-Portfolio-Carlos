import { prisma } from "../../config/prisma";
import { AppError } from "../../utils/AppError";

/// Service for user-related operations
const socialLinkService = {

    /* 
    Method to create a new social link from idUser.
    Input: JSON body with social link details (name, icon, url, userId).
    Output: Created social link object or error message.
    */
    createSocialLink: async (data: any) => {
        // Validate that the user exists
        const existingUser = await prisma.user.findUnique({
            where: { id: data.userId },
        });
        if (!existingUser) throw new AppError("User not found", 404);

        // Create the new social link
        const newSocialLink = await prisma.socialLink.create({ data });
        return newSocialLink;
    },

    /* 
    Method to get all social links for a user by user ID.
    Input: User ID as a parameter.
    Output: Array of social link objects for the specified user, or error message if user not found.
    */
    getAllSocialLinksByUserId: async (idUser: number) => {
        // Validate that the user exists
        const existingUser = await prisma.user.findUnique({
            where: { id: idUser },
        });
        if (!existingUser) throw new AppError("User not found", 404);

        // Get all social links for the user
        const socialLinks = await prisma.socialLink.findMany({
            where: { userId: idUser },
        });

        return socialLinks;
    }

};

export default socialLinkService;