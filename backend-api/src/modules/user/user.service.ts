import { prisma } from "../../config/prisma";
import { AppError } from "../../utils/AppError";
import { uploadImage, uploadPdf, deleteCloudinaryFile } from "../../utils/cloudinary";

/// Service for user-related operations
const userService = {

    /*
    Method to get a user by ID.
    Input: User ID as a parameter.
    Output: User object if found, or error message if not found.
    */
    getUserById: async (id: number) => {
        // Find the user by ID
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                lastname: true,
                email: true,
                title: true,
                city: true,
                country: true,
                description: true,
                urlCV: true,
                urlPhoto: true,
            },
        });

        // If user not found, throw an error
        if (!user) throw new AppError("User not found", 404);

        return user;
    },

    /*
    Method to upload a photo for a user via Cloudinary.
    Input: User ID as a parameter and an image file buffer.
    Output: Updated user object with the new photo URL or an error message if the upload fails.
    */
    uploadUserPhoto: async (id: number, file: Express.Multer.File | undefined) => {
        // If no file is provided, throw an error
        if (!file) throw new AppError("No image file provided", 400);
        
        // Check if the user exists
        const user = await prisma.user.findUnique({
            where: { id },
        });
        if (!user) throw new AppError("User not found", 404);

        // Delete previous photo from Cloudinary if it exists
        if (user.photoPublicId) {
            await deleteCloudinaryFile(user.photoPublicId, "image");
        }

        // Upload new photo to Cloudinary
        const result = await uploadImage(file.buffer, "portfolio/users");

        // Update the user's photo fields
        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                urlPhoto: result.secure_url,
                photoPublicId: result.public_id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                urlPhoto: true,
            },
        });

        return updatedUser;
    },

    /*
    Method to upload a CV for a user via Cloudinary.
    Input: User ID as a parameter and a PDF file buffer.
    Output: Updated user object with the new CV URL or error message if the upload fails.
    */
    uploadUserCV: async (id: number, file?: Express.Multer.File) => {
        // If no file is provided, throw an error
        if (!file) throw new AppError("No CV file provided", 400);
        
        // Check if the user exists
        const user = await prisma.user.findUnique({
            where: { id },
        });
        if (!user) throw new AppError("User not found", 404);

        // Delete previous CV from Cloudinary if it exists
        if (user.cvPublicId) {
            await deleteCloudinaryFile(user.cvPublicId, "raw");
        }

        // Upload new CV to Cloudinary
        const result = await uploadPdf(file.buffer, "portfolio/cv");

        // Update the user's CV fields
        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                urlCV: result.secure_url,
                cvPublicId: result.public_id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                urlCV: true,
            },
        });

        return updatedUser;     
    },

    /*
    Method to update an existing user (excludes urlCV and urlPhoto).
    Input: User ID and JSON body with user details to update.
    Output: Updated user object or error message if user not found or email already exists.
    */
    updateUser: async (id: number, data: any) => {
        // Check if the user exists
        const existingUser = await prisma.user.findUnique({
            where: { id },
        });
        if (!existingUser) throw new AppError("User not found", 404);

        // Check if the email is being changed and if it's already in use by another user
        if (data.email && data.email !== existingUser.email) {
            const emailInUse = await prisma.user.findUnique({
                where: { email: data.email },
            });
            if (emailInUse) throw new AppError("Email already in use by another user", 409);
        }

        // Update the user, excluding sensitive and upload fields
        const { urlCV, urlPhoto, photoPublicId, cvPublicId, password, refreshTokenHash, ...updateData } = data;

        const updatedUser = await prisma.user.update({
            where: { id },
            data: updateData,
            select: {
                id: true,
                name: true,
                lastname: true,
                email: true,
                title: true,
                city: true,
                country: true,
                description: true,
                urlCV: true,
                urlPhoto: true,
            },
        });

        return updatedUser;
    },
    
};

export default userService;
