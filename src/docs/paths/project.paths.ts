export const projectPaths = {
    "/users/{userId}/projects": {
        post: {
            tags: ["Projects"],
            summary: "Create a new project for a user",
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
                            $ref: '#/components/schemas/ProjectCreate'
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: "Project created successfully",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: '#/components/schemas/Project'
                            }
                        }
                    }
                },
                400: {
                    description: "Validation error"
                }
            }
        },
        get: {
            tags: ["Projects"],
            summary: "Get all projects by user ID",
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
                    description: "List of projects",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                $ref: "#/components/schemas/Project"
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
    },

    "/users/{userId}/projects/{projectId}": {
        get: {
            tags: ["Projects"],
            summary: "Get a project by user ID and project ID",
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
                    name: "projectId",
                    required: true,
                    schema: {
                        type: "integer"
                    }
                }
            ],
            responses: {
                200: {
                    description: "Project found",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Project"
                            }
                        }
                    }
                },
                404: {
                    description: "Project not found"
                }
            }
        }
    },

    "/users/{userId}/projects/{projectId}/images": {
        post: {
            tags: ["Projects"],
            summary: "Upload images to a project",
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
                    name: "projectId",
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
                                images: {
                                    type: "array",
                                    items: {
                                        type: "string",
                                        format: "binary"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: "Images uploaded successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    $ref: "#/components/schemas/Image"
                                }
                            }
                        }
                    }
                },
                404: {
                    description: "Project not found"
                },
                400: {
                    description: "Error uploading images"
                }
            }
        },
        get: {
            tags: ["Projects"],
            summary: "Get all images for a project",
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
                    name: "projectId",
                    required: true,
                    schema: {
                        type: "integer"
                    }
                }
            ],
            responses: {
                200: {
                    description: "List of images",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    $ref: "#/components/schemas/Image"
                                }
                            }
                        }
                    }
                },
                404: {
                    description: "Project not found"
                }
            }
        }
    }
}