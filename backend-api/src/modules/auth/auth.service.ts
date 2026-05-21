import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { prisma } from "../../config/prisma";
import { AppError } from "../../utils/AppError";

type JwtPayload = {
    userId: number;
    email: string;
};

const accessSecret = process.env.JWT_ACCESS_SECRET || "dev-access-secret";
const refreshSecret = process.env.JWT_REFRESH_SECRET || "dev-refresh-secret";
const accessExpiresIn = process.env.JWT_ACCESS_EXPIRES_IN || "15m";
const refreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN || "7d";

const publicUserSelect = {
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
};

const signAccessToken = (payload: JwtPayload) => {
    return jwt.sign(payload, accessSecret, { expiresIn: accessExpiresIn } as SignOptions);
};

const signRefreshToken = (payload: JwtPayload) => {
    return jwt.sign(payload, refreshSecret, { expiresIn: refreshExpiresIn } as SignOptions);
};

const authService = {

    /*
    Method to register a new user with a hashed password.
    Input: JSON body with user details and password.
    Output: Public user data without password or refresh token hash.
    */
    register: async (data: any) => {
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email },
        });
        if (existingUser) throw new AppError("Email already registered", 409);

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await prisma.user.create({
            data: {
                ...data,
                password: hashedPassword,
            },
            select: publicUserSelect,
        });

        return user;
    },

    /*
    Method to authenticate a user and generate access and refresh tokens.
    Input: Email and password.
    Output: Public user data and JWT tokens.
    */
    login: async (email: string, password: string) => {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) throw new AppError("Invalid credentials", 401);
        if (!user.password) throw new AppError("User does not have password authentication configured", 401);

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new AppError("Invalid credentials", 401);

        const payload = { userId: user.id, email: user.email };
        const accessToken = signAccessToken(payload);
        const refreshToken = signRefreshToken(payload);
        const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

        await prisma.user.update({
            where: { id: user.id },
            data: { refreshTokenHash },
        });

        const { password: _password, refreshTokenHash: _refreshTokenHash, ...publicUser } = user;

        return {
            user: publicUser,
            accessToken,
            refreshToken,
        };
    },

    /*
    Method to generate a new access token from a valid refresh token.
    Input: Refresh token from JSON body.
    Output: New access token.
    */
    refreshToken: async (refreshToken: string) => {
        let decoded: JwtPayload;

        try {
            decoded = jwt.verify(refreshToken, refreshSecret) as JwtPayload;
        } catch {
            throw new AppError("Invalid refresh token", 401);
        }

        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
        });
        if (!user || !user.refreshTokenHash) {
            throw new AppError("Invalid refresh token", 401);
        }

        const isRefreshTokenValid = await bcrypt.compare(refreshToken, user.refreshTokenHash);
        if (!isRefreshTokenValid) {
            throw new AppError("Invalid refresh token", 401);
        }

        const accessToken = signAccessToken({ userId: user.id, email: user.email });

        return { accessToken };
    },

    /*
    Method to logout a user by invalidating the stored refresh token hash.
    Input: Refresh token from JSON body.
    Output: Success message.
    */
    logout: async (refreshToken: string) => {
        let decoded: JwtPayload;

        try {
            decoded = jwt.verify(refreshToken, refreshSecret) as JwtPayload;
        } catch {
            throw new AppError("Invalid refresh token", 401);
        }

        await prisma.user.updateMany({
            where: { id: decoded.userId },
            data: { refreshTokenHash: null },
        });

        return { message: "Logged out successfully" };
    },

    /*
    Method to get authenticated user information.
    Input: Authenticated user ID from JWT middleware.
    Output: Public user data.
    */
    me: async (userId: number) => {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: publicUserSelect,
        });
        if (!user) throw new AppError("User not found", 404);

        return user;
    },

    /*
    Method to change the password of an authenticated user.
    Input: Authenticated user ID, current password and new password.
    Output: Success message and invalidates refresh token sessions.
    */
    changePassword: async (userId: number, currentPassword: string, newPassword: string) => {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) throw new AppError("User not found", 404);
        if (!user.password) throw new AppError("User does not have password authentication configured", 401);

        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isCurrentPasswordValid) throw new AppError("Invalid current password", 401);

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { id: userId },
            data: {
                password: hashedPassword,
                refreshTokenHash: null,
            },
        });

        return { message: "Password changed successfully" };
    },
};

export default authService;
