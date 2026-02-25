import { prisma } from "../config/prisma";
import { AppError } from "../utils/AppError";

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
        });

        // If user not found, throw an error
        if (!user) throw new AppError("User not found", 404);

        return user;
    }
    
};

export default userService;