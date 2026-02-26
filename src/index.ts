import express from "express";
import { errorHandler } from "./middlewares/error.middleware";

import userRouter from "./routes/user.route";
import educationRouter from "./routes/education.route";
import projectRouter from "./routes/project.route";

// Create Express app
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1", educationRouter);
app.use("/api/v1", projectRouter);

// Error handling middleware
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});