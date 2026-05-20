export const socialLinkPaths = {
    "/users/{userId}/social-links": {
        post: {
            tags: ["Social Links"],
            summary: "Create a new social link for a user",
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
                            $ref: "#/components/schemas/SocialLinkCreate"
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: "Social link created successfully",
                    content: {
                        "application/json": {
                        schema: {
                            allOf: [
                                { $ref: "#/components/schemas/SuccessResponse" },
                                {
                                    type: "object",
                                    properties: {
                                        data: {
                                            $ref: "#/components/schemas/SocialLink"
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
            summary: "Get all social links for a user",
            tags: ["Social Links"],
            parameters: [
                {
                    in: "path",
                    name: "userId",
                    required: true,
                    schema: {
                        type: "string"
                    }
                }
            ],
            responses: {
                200: {
                    description: "Contacts retrieved successfully",
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
                                                    $ref: "#/components/schemas/SocialLink"
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

    "/users/{userId}/social-links/{socialLinkId}": {
        put: {
            tags: ["Social Links"],
            summary: "Update an existing social link for a user",
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
                    name: "socialLinkId",
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
                            $ref: "#/components/schemas/SocialLinkUpdate"
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Social link updated successfully",
                    content: {
                        "application/json": {
                            schema: {
                                allOf: [
                                    { $ref: "#/components/schemas/SuccessResponse" },
                                    {
                                        type: "object",
                                        properties: {
                                            data: {
                                                $ref: "#/components/schemas/SocialLink"
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
        delete: {
            tags: ["Social Links"],
            summary: "Delete a social link for a user",
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
                    name: "socialLinkId",
                    required: true,
                    schema: {
                        type: "integer"
                    }
                }
            ],
            responses: {
                200: {
                    description: "Social link deleted successfully",
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
                500: {
                    $ref: "#/components/responses/InternalServerError"
                }
            }
        }
    }
};