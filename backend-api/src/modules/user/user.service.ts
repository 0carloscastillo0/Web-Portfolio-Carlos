import path from "path";
import fs from "fs";
import { prisma } from "../../config/prisma";
import { AppError } from "../../utils/AppError";

/// Service for user-related operations
const userService = {

    /* 
    Method to create a new user.
    Input: JSON body with user details (name, email, password).
    Output: Created user object or error message.
    */
    createUser: async (data: any) => {
        // Check if a user with the same email already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email },
        });
        if (existingUser) throw new AppError("Email already registered", 409);

        // Create the new user
        const newUser = await prisma.user.create({ data });

        return newUser;
    },

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
    Method to upload a photo for a user.
    Input: User ID as a parameter and an image file.
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


        // If the file is provided, update the user's urlPhoto field with the path to the uploaded file
        if (user.urlPhoto) {
            const oldPath = path.resolve("uploads/users", path.basename(user.urlPhoto)
            );

            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
        }

        // Update the user's urlPhoto field with the path to the uploaded file
        const updatedUser = await prisma.user.update({
            where: { id },
            data: { urlPhoto: `/uploads/users/${file.filename}` },
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
    Method to upload a CV for a user.
    Input: User ID as a parameter and a PDF file.
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

        // If the file is provided, update the user's urlCV field with the path to the uploaded file
        if (user.urlCV) {
            const oldPath = path.resolve("uploads/cv", path.basename(user.urlCV)
            );

            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
        }

        // Update the user's urlCV field with the path to the uploaded file
        const updatedUser = await prisma.user.update({
            where: { id },
            data: { urlCV: `/uploads/cv/${file.filename}` },
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

        // Update the user, excluding urlCV and urlPhoto fields
        const { urlCV, urlPhoto, ...updateData } = data;

        const updatedUser = await prisma.user.update({
            where: { id },
            data: updateData,
        });

        return updatedUser;
    },
    
};

export default userService;
