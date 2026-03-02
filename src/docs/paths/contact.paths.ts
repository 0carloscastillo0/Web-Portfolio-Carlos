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
                            $ref: "#/components/schemas/Contact"
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
            summary: "Get all contacts for a user",
            tags: [
                "Contacts"
            ],
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
                    description: "List of contacts",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                $ref: "#/components/schemas/Contact"
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