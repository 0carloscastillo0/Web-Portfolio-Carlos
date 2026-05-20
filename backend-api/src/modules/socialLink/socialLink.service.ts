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
    },

    /*
    Method to update an existing social link for a specific user.
    Input: User ID, Social Link ID, and JSON body with social link details to update.
    Output: Updated social link object or error message if social link not found or does not belong to the user.
    */
    updateSocialLink: async (userId: number, socialLinkId: number, data: any) => {
        // Validate that the user exists
        const existingUser = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!existingUser) throw new AppError("User not found", 404);

        // Validate that the social link exists and belongs to the user
        const existingSocialLink = await prisma.socialLink.findUnique({
            where: { id: socialLinkId, userId: userId }
        });
        if (!existingSocialLink) {
            throw new AppError("Social link not found for this user", 404);
        }

        // Update the social link
        const updatedSocialLink = await prisma.socialLink.update({
            where: { id: socialLinkId },
            data: data,
        });

        return updatedSocialLink;
    },

    /*
    Method to delete a social link for a specific user.
    Input: User ID and Social Link ID as parameters.
    Output: Success message or error message if social link not found or does not belong to the user.
    */
    deleteSocialLink: async (userId: number, socialLinkId: number) => {
        // Validate that the user exists
        const existingUser = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!existingUser) throw new AppError("User not found", 404);

        // Validate that the social link exists and belongs to the user
        const existingSocialLink = await prisma.socialLink.findUnique({
            where: { id: socialLinkId, userId: userId }
        });
        if (!existingSocialLink) {
            throw new AppError("Social link not found for this user", 404);
        }

        // Delete the social link
        await prisma.socialLink.delete({
            where: { id: socialLinkId }
        });

        return { message: "Social link deleted successfully" };
    }

};

export default socialLinkService;