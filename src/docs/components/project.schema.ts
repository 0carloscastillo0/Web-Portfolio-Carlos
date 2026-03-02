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
                format: "date-time" 
            },
            endDate: { 
                type: "string", 
                format: "date-time", 
                nullable: true 
            },
            description: { type: "string" },
            userId: { 
                type: "integer", 
                example: 1 
            }
        }
    },

    ProjectCreate: {
        type: "object",
        required: ["title", "startDate", "description", "userId"],
        properties: {
            title: { type: "string" },
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
                type: "string" 
            },
            userId: { 
                type: "integer" 
            }
        }
    },
};