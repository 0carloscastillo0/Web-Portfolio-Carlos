import swaggerJsdoc from "swagger-jsdoc";

import { userSchemas } from "./components/user.schema";
import { projectSchemas } from "./components/project.schema";
import { educationSchemas } from "./components/education.schema";
import { contactSchemas } from "./components/contact.schema";
import { skillSchemas } from "./components/skill.schema";

import { userPaths } from "./paths/user.paths";
import { projectPaths } from "./paths/project.paths";
import { educationPaths } from "./paths/education.paths";
import { contactPaths } from "./paths/contact.paths";
import { skillPaths } from "./paths/skill.paths";

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
        ...contactSchemas,
        ...skillSchemas
      }
    },
    paths: {
      ...userPaths,
      ...projectPaths,
      ...educationPaths,
      ...contactPaths,
      ...skillPaths
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