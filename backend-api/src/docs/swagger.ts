import swaggerJsdoc from "swagger-jsdoc";

import { userSchemas } from "./components/user.schema";
import { projectSchemas } from "./components/project.schema";
import { educationSchemas } from "./components/education.schema";
import { socialLinkSchemas } from "./components/socialLink.schema";
import { skillSchemas } from "./components/skill.schema";
import { authSchemas } from "./components/auth.schema";
import { commonResponses, commonSchema } from "./components/common.schema";

import { userPaths } from "./paths/user.paths";
import { projectPaths } from "./paths/project.paths";
import { educationPaths } from "./paths/education.paths";
import { socialLinkPaths } from "./paths/socialLink.paths";
import { skillPaths } from "./paths/skill.paths";
import { authPaths } from "./paths/auth.paths";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Portfolio API",
      version: "1.0.0",
      description: "API REST for manager profesional information",
    },
    components: {
      schemas: {
        ...userSchemas,
        ...projectSchemas,
        ...educationSchemas,
        ...socialLinkSchemas,
        ...skillSchemas,
        ...authSchemas,
        ...commonSchema,
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      responses: {
        ...commonResponses,
      },
    },
    paths: {
      ...userPaths,
      ...projectPaths,
      ...educationPaths,
      ...socialLinkPaths,
      ...skillPaths,
      ...authPaths
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/docs/routes/*.yaml"], // here it will read the JSDoc comments in your route files
};

export const swaggerSpec = swaggerJsdoc(options);
