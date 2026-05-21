export const authPaths = {
    "/auth/register": {
        post: {
            tags: ["Auth"],
            summary: "Register a new user with hashed password",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/AuthRegister" },
                    },
                },
            },
            responses: {
                201: {
                    description: "User registered successfully",
                    content: {
                        "application/json": {
                            schema: {
                                allOf: [
                                    { $ref: "#/components/schemas/SuccessResponse" },
                                    {
                                        type: "object",
                                        properties: {
                                            data: { $ref: "#/components/schemas/User" },
                                        },
                                    },
                                ],
                            },
                        },
                    },
                },
                400: { $ref: "#/components/responses/BadRequest" },
                409: { $ref: "#/components/responses/Conflict" },
                500: { $ref: "#/components/responses/InternalServerError" },
            },
        },
    },

    "/auth/login": {
        post: {
            tags: ["Auth"],
            summary: "Login user and generate JWT tokens",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/AuthLogin" },
                    },
                },
            },
            responses: {
                200: {
                    description: "Login successful",
                    content: {
                        "application/json": {
                            schema: {
                                allOf: [
                                    { $ref: "#/components/schemas/SuccessResponse" },
                                    {
                                        type: "object",
                                        properties: {
                                            data: {
                                                type: "object",
                                                properties: {
                                                    user: { $ref: "#/components/schemas/User" },
                                                    accessToken: { type: "string" },
                                                    refreshToken: { type: "string" },
                                                },
                                            },
                                        },
                                    },
                                ],
                            },
                        },
                    },
                },
                400: { $ref: "#/components/responses/BadRequest" },
                401: { $ref: "#/components/responses/Unauthorized" },
                500: { $ref: "#/components/responses/InternalServerError" },
            },
        },
    },

    "/auth/refresh-token": {
        post: {
            tags: ["Auth"],
            summary: "Refresh expired access token using refresh token from JSON body",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/AuthRefreshToken" },
                    },
                },
            },
            responses: {
                200: {
                    description: "Access token refreshed successfully",
                    content: {
                        "application/json": {
                            schema: {
                                allOf: [
                                    { $ref: "#/components/schemas/SuccessResponse" },
                                    {
                                        type: "object",
                                        properties: {
                                            data: {
                                                type: "object",
                                                properties: {
                                                    accessToken: { type: "string" },
                                                },
                                            },
                                        },
                                    },
                                ],
                            },
                        },
                    },
                },
                400: { $ref: "#/components/responses/BadRequest" },
                401: { $ref: "#/components/responses/Unauthorized" },
                500: { $ref: "#/components/responses/InternalServerError" },
            },
        },
    },

    "/auth/logout": {
        post: {
            tags: ["Auth"],
            summary: "Logout user by invalidating refresh token",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/AuthRefreshToken" },
                    },
                },
            },
            responses: {
                200: {
                    description: "Logged out successfully",
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/SuccessResponse" },
                        },
                    },
                },
                400: { $ref: "#/components/responses/BadRequest" },
                401: { $ref: "#/components/responses/Unauthorized" },
                500: { $ref: "#/components/responses/InternalServerError" },
            },
        },
    },

    "/auth/me": {
        get: {
            tags: ["Auth"],
            summary: "Get authenticated user information",
            security: [{ bearerAuth: [] }],
            responses: {
                200: {
                    description: "Authenticated user retrieved successfully",
                    content: {
                        "application/json": {
                            schema: {
                                allOf: [
                                    { $ref: "#/components/schemas/SuccessResponse" },
                                    {
                                        type: "object",
                                        properties: {
                                            data: { $ref: "#/components/schemas/User" },
                                        },
                                    },
                                ],
                            },
                        },
                    },
                },
                401: { $ref: "#/components/responses/Unauthorized" },
                404: { $ref: "#/components/responses/NotFound" },
                500: { $ref: "#/components/responses/InternalServerError" },
            },
        },
    },

    "/auth/change-password": {
        patch: {
            tags: ["Auth"],
            summary: "Change password for authenticated user",
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/AuthChangePassword" },
                    },
                },
            },
            responses: {
                200: {
                    description: "Password changed successfully",
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/SuccessResponse" },
                        },
                    },
                },
                400: { $ref: "#/components/responses/BadRequest" },
                401: { $ref: "#/components/responses/Unauthorized" },
                404: { $ref: "#/components/responses/NotFound" },
                500: { $ref: "#/components/responses/InternalServerError" },
            },
        },
    },
};
