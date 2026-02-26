import { prisma } from "../config/prisma";
import { AppError } from "../utils/AppError";

/// Service for user-related operations
const contactService = {

    /* 
    Method to create a new contact from idUser.
    Input: JSON body with contact details (name, icon, url, userId).
    Output: Created contact object or error message.
    */
    createContact: async (data: any) => {
        // Validate that the user exists
        const existingUser = await prisma.user.findUnique({
            where: { id: data.userId },
        });
        if (!existingUser) throw new AppError("User not found", 404);

        // Create the new contact
        const newContact = await prisma.contact.create({ data });
        return newContact;
    },

    /* 
    Method to get all contacts for a user by user ID.
    Input: User ID as a parameter.
    Output: Array of contact objects for the specified user, or error message if user not found.
    */
    getAllContactsByUserId: async (idUser: number) => {
        // Validate that the user exists
        const existingUser = await prisma.user.findUnique({
            where: { id: idUser },
        });
        if (!existingUser) throw new AppError("User not found", 404);

        // Get all contacts for the user
        const contacts = await prisma.contact.findMany({
            where: { userId: idUser },
        });

        return contacts;
    }

};

export default contactService;