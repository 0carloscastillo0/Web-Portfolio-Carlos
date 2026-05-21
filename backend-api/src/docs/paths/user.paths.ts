export const userPaths = {
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
                                allOf: [
                                    { $ref: "#/components/schemas/SuccessResponse" },
                                    {
                                        type: "object",
                                        properties: {
                                            data: {
                                                type: "array",
                                                items: {
                                                    $ref: "#/components/schemas/User"
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
        },
        put: {
            tags: ["Users"],
            summary: "Update an existing user (excludes urlCV and urlPhoto)",
            security: [{ bearerAuth: [] }],
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
                    "application/json": {
                        schema: {
                            $ref: '#/components/schemas/UserUpdate'
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "User updated successfully",
                    content: {
                        "application/json": {
                            schema: {
                                allOf: [
                                    { $ref: "#/components/schemas/SuccessResponse" },
                                    {
                                        type: "object",
                                        properties: {
                                            data: {
                                                $ref: "#/components/schemas/User"
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
                409: {
                    $ref: "#/components/responses/Conflict"
                },
                500: {
                    $ref: "#/components/responses/InternalServerError"
                }
            }
        }
    },

    "/users/{id}/photo": {
        post: {
            tags: ["Users"],
            summary: "Upload user photo",
            security: [{ bearerAuth: [] }],
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
                201: {
                    description: "Photo uploaded successfully",
                    content: {
                        "application/json": {
                            schema: {
                                allOf: [
                                    { $ref: "#/components/schemas/SuccessResponse" },
                                    {
                                        type: "object",
                                        properties: {
                                            data: {
                                                $ref: "#/components/schemas/User"
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
        }
    },

    "/users/{id}/cv": {
        post: {
            tags: ["Users"],
            summary: "Upload user CV",
            security: [{ bearerAuth: [] }],
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
                201: {
                    description: "CV uploaded successfully",
                    content: {
                        "application/json": {
                            schema: {
                                allOf: [
                                    { $ref: "#/components/schemas/SuccessResponse" },
                                    {
                                        type: "object",
                                        properties: {
                                            data: {
                                                $ref: "#/components/schemas/User"
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
        }
    }
}
