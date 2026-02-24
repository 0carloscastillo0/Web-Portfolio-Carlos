import { prisma } from "../config/prisma";


const userService = {
    createUser: async (data: any) => {

        const existingUser = await prisma.user.findUnique({
            where: { email: data.email },
        });

        if (existingUser) {
            throw new Error("EMAIL_ALREADY_EXISTS");
        }

        return prisma.user.create({
            data,
        });
    },
};

export default userService;