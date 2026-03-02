export const contactSchemas = {
    Contact: {
        type: "object",
        properties: {
            id: { 
                type: "integer", 
                example: 1 
            },
            name: { 
                type: "string", 
                example: "LinkedIn" 
            },
            icon: { 
                type: "string", 
                example: "linkedin-icon" 
            },
            url: { 
                type: "string", 
                example: "https://linkedin.com/in/usuario" 
            },
            userId: { 
                type: "integer", 
                example: 1 
            }
        }
    },

    ContactCreate: {
        type: "object",
        required: ["name", "icon", "url"],
        properties: {
            name: { 
                type: "string" 
            },
            icon: { 
                type: "string" 
            },
            url: { 
                type: "string" 
            }
        }
    }
};