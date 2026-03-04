export const userSchemas = {
    User: {
        type: "object",
        properties: {
            id: { 
                type: "integer", 
                example: 1 
            },
            name: { 
                type: "string", 
                example: "Carlos" 
            },
            lastname: { 
                type: "string", 
                example: "Castillo" 
            },
            email: { 
                type: "string", 
                example: "carlos@email.com" 
            },
            title: { 
                type: "string", 
                example: "Fullstack Developer" 
            },
            city: { 
                type: "string", 
                example: "Santiago" 
            },
            country: { 
                type: "string", 
                example: "Chile" 
            },
            description: { 
                type: "string",
                example: "Experienced fullstack developer with a passion for building scalable web applications and working across the full stack." 
            },
            urlCV: { 
                type: "string", 
                nullable: true,
                example: "https://example.com/carlos-cv.pdf"
            },
            urlPhoto: { 
                type: "string", 
                nullable: true,
                example: "https://example.com/carlos-photo.jpg"
            }
        }
    },

    UserCreate: {
        type: "object",
        required: ["name", "lastname", "email", "title", "city", "country", "description"],
        properties: {
            name: { 
                type: "string",
                example: "Carlos"
            },
            lastname: { 
                type: "string",
                example: "Castillo"
            },
            email: { 
                type: "string",
                example: "carlos@email.com"
            },
            title: { 
                type: "string",
                example: "Fullstack Developer"
            },
            city: { 
                type: "string",
                example: "Santiago"
            },
            country: { 
                type: "string",
                example: "Chile"
            },
            description: { 
                type: "string",
                example: "Experienced fullstack developer with a passion for building scalable web applications and working across the full stack."
            }
        }
    },
};