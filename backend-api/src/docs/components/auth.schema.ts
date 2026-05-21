export const authSchemas = {
    AuthRegister: {
        type: "object",
        required: ["name", "lastname", "email", "password", "title", "city", "country", "description"],
        properties: {
            name: { type: "string", example: "Carlos" },
            lastname: { type: "string", example: "Castillo" },
            email: { type: "string", example: "carlos@email.com" },
            password: { type: "string", example: "12345678" },
            title: { type: "string", example: "Fullstack Developer" },
            city: { type: "string", example: "Santiago" },
            country: { type: "string", example: "Chile" },
            description: { type: "string", example: "Fullstack developer" },
        },
    },

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
