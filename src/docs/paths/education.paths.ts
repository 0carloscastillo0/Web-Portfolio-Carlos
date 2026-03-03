export const educationPaths = {
    "/users/{userId}/educations": {
        post: {
            tags: ["Educations"],
            summary: "Create a new education for a user",
            parameters: [
                {
                    in: "path",
                    name: "userId",
                    required: true,
                    schema: {
                        type: "integer"
                    },
                    description: "User ID"
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/EducationCreate"
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: "Education created successfully",
                    content: {
                        "application/json": {
                            schema: {
                                allOf: [
                                    { $ref: "#/components/schemas/SuccessResponse" },
                                    {
                                        type: "object",
                                        properties: {
                                            data: {
                                                $ref: "#/components/schemas/Education"
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
                500: {
                    $ref: "#/components/responses/InternalServerError"
                }
            }
        },
        get: {
            tags: ["Educations"],
            summary: "Get all educations by user ID",
            parameters: [
                {
                    in: "path",
                    name: "userId",
                    required: true,
                    schema: {
                        type: "integer"
                    }
                }
            ],
            responses: {
                200: {
                    description: "List of educations retrieved successfully",
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
                                                    $ref: "#/components/schemas/Education"
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
    }
};