export const skillPaths = {
    "/users/{userId}/skills": {
        post: {
            tags: ["Skills"],
            summary: "Create a new skill for a user",
            parameters: [
                {
                    in: "path",
                    name: "userId",
                    required: true,
                    schema: {
                        type: "string"
                    },
                    description: "User ID"
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/SkillCreateInput"
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: "Skill created successfully",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Skill"
                            }
                        }
                    }
                },
                400: {
                    description: "Validation error"
                },
                404: {
                    description: "User not found"
                }
            }
        },

        get: {
            tags: ["Skills"],
            summary: "Get all skills by user ID",
            parameters: [
                {
                    in: "path",
                    name: "userId",
                    required: true,
                    schema: {
                        type: "string"
                    },
                    description: "User ID"
                }
            ],
            responses: {
                200: {
                    description: "List of skills",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    $ref: "#/components/schemas/Skill"
                                }
                            }
                        }
                    }
                },
                404: {
                    description: "User not found"
                }
            }
        }
    }
};