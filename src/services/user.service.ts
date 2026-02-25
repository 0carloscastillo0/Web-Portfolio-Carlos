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
        if (existingUser) throw new AppError("Email alreadyyy registered", 409);

        // Create the new user
        const newUser = await prisma.user.create({ data });

        return newUser;
    },
};

export default userService;