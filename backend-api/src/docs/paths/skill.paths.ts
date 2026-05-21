export const skillPaths = {
    "/users/{userId}/skills": {
        post: {
            tags: ["Skills"],
            summary: "Create a new skill for a user",
            security: [{ bearerAuth: [] }],
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
                                allOf: [
                                    { $ref: "#/components/schemas/SuccessResponse" },
                                    {
                                        type: "object",
                                        properties: {
                                            data: {
                                                $ref: "#/components/schemas/Skill"
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    }
                },
                400: {
                    $ref: "#/components/responses/BadRequest"
                },
                404: {
                    $ref: "#/components/responses/NotFound"
                },
                403: {
                    $ref: "#/components/responses/Forbidden"
                },
                500: {
                    $ref: "#/components/responses/InternalServerError"
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
                                allOf: [
                                    { $ref: "#/components/schemas/SuccessResponse" },
                                    {
                                        type: "object",
                                        properties: {
                                            data: {
                                                type: "array",
                                                items: {
                                                    $ref: "#/components/schemas/Skill"
                                                }
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    }
                },
                404: {
                    $ref: "#/components/responses/NotFound"
                },
                500: {
                    $ref: "#/components/responses/InternalServerError"
                }
            }
        }
    },

    "/users/{userId}/skills/{skillId}": {
        put: {
            tags: ["Skills"],
            summary: "Update an existing skill for a user",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    in: "path",
                    name: "userId",
                    required: true,
                    schema: {
                        type: "integer"
                    }
                },
                {
                    in: "path",
                    name: "skillId",
                    required: true,
                    schema: {
                        type: "integer"
                    }
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/SkillUpdate"
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Skill updated successfully",
                    content: {
                        "application/json": {
                            schema: {
                                allOf: [
                                    { $ref: "#/components/schemas/SuccessResponse" },
                                    {
                                        type: "object",
                                        properties: {
                                            data: {
                                                $ref: "#/components/schemas/Skill"
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    }
                },
                400: {
                    $ref: "#/components/responses/BadRequest"
                },
                404: {
                    $ref: "#/components/responses/NotFound"
                },
                403: {
                    $ref: "#/components/responses/Forbidden"
                },
                500: {
                    $ref: "#/components/responses/InternalServerError"
                }
            }
        },
        delete: {
            tags: ["Skills"],
            summary: "Delete a skill for a user",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    in: "path",
                    name: "userId",
                    required: true,
                    schema: {
                        type: "integer"
                    }
                },
                {
                    in: "path",
                    name: "skillId",
                    required: true,
                    schema: {
                        type: "integer"
                    }
                }
            ],
            responses: {
                200: {
                    description: "Skill deleted successfully",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/SuccessResponse"
                            }
                        }
                    }
                },
                404: {
                    $ref: "#/components/responses/NotFound"
                },
                403: {
                    $ref: "#/components/responses/Forbidden"
                },
                500: {
                    $ref: "#/components/responses/InternalServerError"
                }
            }
        }
    }
};
