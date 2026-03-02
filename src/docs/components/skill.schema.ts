export const skillSchemas = {
  Skill: {
    type: "object",
    properties: {
      id: {
        type: "string",
        example: "clx123abc456"
      },
      name: {
        type: "string",
        example: "TypeScript"
      },
      level: {
        type: "string",
        example: "Advanced"
      },
      userId: {
        type: "string",
        example: "clx999user123"
      },
      createdAt: {
        type: "string",
        format: "date-time",
        example: "2026-03-01T00:00:00.000Z"
      }
    }
  },

  SkillCreateInput: {
    type: "object",
    required: ["name", "level"],
    properties: {
      name: {
        type: "string",
        example: "TypeScript"
      },
      level: {
        type: "string",
        example: "Advanced"
      }
    }
  }
};