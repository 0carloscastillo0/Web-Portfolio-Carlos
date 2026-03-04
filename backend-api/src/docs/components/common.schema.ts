export const commonSchema = {
  ErrorResponse: {
    type: "object",
    required: ["success", "message"],
    properties: {
      success: {
        type: "boolean",
        example: false
      },
      message: {
        type: "string",
        example: "Validation error"
      },
      errors: {
        type: "array",
        items: {
          type: "string"
        },
        example: ["email is required"]
      }
    }
  },

  SuccessResponse: {
    type: "object",
    required: ["success", "message", "data"],
    properties: {
      success: {
        type: "boolean",
        example: true
      },
      message: {
        type: "string",
        example: "Operation successful"
      },
      data: {
        description: "Response payload"
      }
    }
  }
};

export const commonResponses = {
  BadRequest: {
    description: "Validation error",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/ErrorResponse"
        },
        example: {
          success: false,
          message: "Validation error",
          errors: ["value is required"]
        }
      }
    }
  },

  NotFound: {
    description: "Resource not found",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/ErrorResponse"
        },
        example: {
          success: false,
          message: "User not found",
          errors: []
        }
      }
    }
  },

  InternalServerError: {
    description: "Internal server error",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/ErrorResponse"
        },
        example: {
          success: false,
          message: "Unexpected server error",
          errors: []
        }
      }
    }
  },

  Created: {
    description: "Resource created successfully",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/SuccessResponse"
        },
        example: {
          success: true,
          message: "Resource created successfully",
          data: {}
        }
      }
    }
  },

  Ok: {
    description: "Operation successful",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/SuccessResponse"
        },
        example: {
          success: true,
          message: "Operation successful",
          data: {}
        }
      }
    }
  }
};