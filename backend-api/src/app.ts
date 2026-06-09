import express from "express";
import cors from "cors";
import helmet from "helmet";
import { errorHandler } from "./middlewares/error.middleware";
import { authRateLimit } from "./middlewares/rateLimit.middleware";
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

// Security middleware
app.use(helmet({ contentSecurityPolicy: false }));

// CORS configuration
const allowedOrigins = [
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));

// Body parsing with limits
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// Health check endpoint
app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "OK",
  });
});

// Swagger documentation
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rate limiting for auth routes
app.use("/api/v1/auth", authRateLimit);

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
