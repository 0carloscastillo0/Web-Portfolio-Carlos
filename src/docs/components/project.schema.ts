export const projectSchemas = {
    Project: {
        type: "object",
        properties: {
            id: { 
                type: "integer", 
                example: 1 
            },
            title: { 
                type: "string", 
                example: "Web Portfolio" 
            },
            startDate: { 
                type: "string", 
                format: "date-time",
                example: "2023-01-01T00:00:00Z" 
            },
            endDate: { 
                type: "string", 
                format: "date-time", 
                nullable: true,
                example: "2023-12-31T23:59:59Z"
            },
            description: { 
                type: "string",
                example: "A personal web portfolio showcasing my projects and skills."
            },
            userId: { 
                type: "integer", 
                example: 1 
            }
        }
    },

    ProjectCreate: {
        type: "object",
        required: ["title", "startDate", "description"],
        properties: {
            title: { 
                type: "string",
                example: "Web Portfolio" 
            },
            startDate: { 
                type: "string", 
                format: "date-time",
                example: "2023-01-01T00:00:00Z"
            },
            endDate: { 
                type: "string", 
                format: "date-time", 
                nullable: true,
                example: "2023-12-31T23:59:59Z"
            },
            description: { 
                type: "string",
                example: "A personal web portfolio showcasing my projects and skills."
            }
        }
    },
};