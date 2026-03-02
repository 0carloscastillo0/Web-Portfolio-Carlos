export const educationSchemas = {
    Education: {
        type: "object",
        properties: {
            id: { 
                type: "integer", 
                example: 1 
            },
            place: { 
                type: "string", 
                example: "Universidad de Santiago" 
            },
            name: { 
                type: "string", 
                example: "Ingeniería Civil Informática" 
            },
            startDate: { 
                type: "string", 
                format: "date-time" 
            },
            endDate: { 
                type: "string", 
                format: "date-time", 
                nullable: true 
            },
            description: { 
                type: "string", 
                nullable: true 
            },
            userId: { 
                type: "integer", 
                example: 1 
            }
        }
    },

    EducationCreate: {
        type: "object",
        required: ["place", "name", "startDate"],
        properties: {
            place: { 
                type: "string" 
            },
            name: { 
                type: "string" 
            },
            startDate: { 
                type: "string", 
                format: "date-time" 
            },
            endDate: { 
                type: "string", 
                format: "date-time", 
                nullable: true 
            },
            description: { 
                type: "string", 
                nullable: true 
            }
        }
    },
};