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
                type: "string" 
            },
            urlCV: { 
                type: "string", 
                nullable: true 
            },
            urlPhoto: { 
                type: "string", 
                nullable: true 
            }
        }
    },

    UserCreate: {
        type: "object",
        required: ["name", "lastname", "email", "title", "city", "country", "description"],
        properties: {
            name: { 
                type: "string" 
            },
            lastname: { 
                type: "string" 
            },
            email: { 
                type: "string" 
            },
            title: { 
                type: "string" 
            },
            city: { 
                type: "string" 
            },
            country: { 
                type: "string" 
            },
            description: { 
                type: "string" 
            }
        }
    },
};