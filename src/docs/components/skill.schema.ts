export const skillSchemas = {
  Skill: {
    type: "object",
    properties: {
      id: { 
          type: "integer", 
          example: 1 
      },
      name: { 
          type: "string", 
          example: "TypeScript" 
      },
      category: { 
          type: "string", 
          example: "Programming Language" 
      },
      icon: { 
          type: "string", 
          example: "typescript-icon" 
      },
      userId: { 
          type: "integer", 
          example: 1 
      }
    }
  },

  SkillCreateInput: {
    type: "object",
    required: ["name", "category", "icon"],
    properties: {
      name: {
        type: "string",
        example: "TypeScript"
      },
      category: {
        type: "string",
        example: "Programming Language"
      },
      icon: {
        type: "string",
        example: "typescript-icon"
      }
    }
  }
};