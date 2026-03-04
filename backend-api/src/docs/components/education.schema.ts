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
                format: "date-time",
                example: "2020-03-01T00:00:00Z"
            },
            endDate: { 
                type: "string", 
                format: "date-time", 
                nullable: true,
                example: "2024-12-31T00:00:00Z"
            },
            description: { 
                type: "string", 
                nullable: true,
                example: "Descripción de la educación"
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
                type: "string",
                example: "Universidad de Santiago"
            },
            name: { 
                type: "string",
                example: "Ingeniería Civil Informática"
            },
            startDate: { 
                type: "string", 
                format: "date-time",
                example: "2020-03-01T00:00:00Z"
            },
            endDate: { 
                type: "string", 
                format: "date-time", 
                nullable: true,
                example: "2024-12-31T00:00:00Z"
            },
            description: { 
                type: "string", 
                nullable: true,
                example: "Descripción de la educación"
            }
        }
    },
};