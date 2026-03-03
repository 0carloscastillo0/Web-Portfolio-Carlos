export const contactPaths = {
    "/users/{userId}/contacts": {
        post: {
            tags: ["Contacts"],
            summary: "Create a new contact for a user",
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
                            $ref: "#/components/schemas/ContactCreate"
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: "Contact created successfully",
                    content: {
                        "application/json": {
                        schema: {
                            allOf: [
                                { $ref: "#/components/schemas/SuccessResponse" },
                                {
                                    type: "object",
                                    properties: {
                                        data: {
                                            $ref: "#/components/schemas/Contact"
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
            summary: "Get all contacts for a user",
            tags: ["Contacts"],
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
                                                    $ref: "#/components/schemas/Contact"
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