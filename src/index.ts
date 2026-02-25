import express from "express";

import userRouter from "./routes/user.route";
import educationRouter from "./routes/education.route";
import { errorHandler } from "./middlewares/error.middleware";

// Create Express app
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1", educationRouter);

// Error handling middleware
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});