export const userPaths = {
    "/users": {
        post: {
            tags: ["Users"],
            summary: "Create a new user",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: '#/components/schemas/UserCreate'
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: "User created successfully",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: '#/components/schemas/User'
                            }
                        }
                    }
                },
                400: {
                    description: "Validation error"
                }
            }
        }
    },

    "/users/{id}": {
        get: {
            tags: ["Users"],
            summary: "Get user by ID",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    schema: {
                        type: "integer"
                    }
                }
            ],
            responses: {
                200: {
                    description: "User retrieved successfully",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: '#/components/schemas/User'
                            }
                        }
                    }
                },
                404: {
                    description: "User not found"
                }
            }
        }
    },

    "/users/{id}/photo": {
        post: {
            tags: ["Users"],
            summary: "Upload user photo",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    schema: {
                        type: "integer"
                    }
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "multipart/form-data": {
                        schema: {
                        type: "object",
                        properties: {
                            image: {
                                type: "string",
                                format: "binary"
                            }
                        }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Photo uploaded successfully"
                }
            }
        }
    },

    "/users/{id}/cv": {
        post: {
            tags: ["Users"],
            summary: "Upload user CV",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    schema: {
                        type: "integer"
                    }
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "multipart/form-data": {
                        schema: {
                            type: "object",
                            properties: {
                                cv: {
                                    type: "string",
                                    format: "binary"
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "CV subido correctamente"
                }
            }
        }
    }
}