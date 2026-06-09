export const authSchemas = {
    AuthLogin: {
        type: "object",
        required: ["email", "password"],
        properties: {
            email: { type: "string", example: "carlos@email.com" },
            password: { type: "string", example: "12345678" },
        },
    },

    AuthRefreshToken: {
        type: "object",
        required: ["refreshToken"],
        properties: {
            refreshToken: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
        },
    },

    AuthTokens: {
        type: "object",
        properties: {
            accessToken: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
            refreshToken: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
        },
    },

    AuthChangePassword: {
        type: "object",
        required: ["currentPassword", "newPassword"],
        properties: {
            currentPassword: { type: "string", example: "12345678" },
            newPassword: { type: "string", example: "NuevaPassword123" },
        },
    },
};
