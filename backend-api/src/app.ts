import express from "express";
import { errorHandler } from "./middlewares/error.middleware";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";

import userRouter from "./modules/user/user.route";
import educationRouter from "./modules/education/education.route";
import projectRouter from "./modules/project/project.route";
import socialLinkRouter from "./modules/socialLink/socialLink.route";
import skillRouter from "./modules/skill/skill.route";
import authRouter from "./modules/auth/auth.route";

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1", educationRouter);
app.use("/api/v1", projectRouter);
app.use("/api/v1", socialLinkRouter);
app.use("/api/v1", skillRouter);

// Error handling middleware
app.use(errorHandler);

export default app;
