import express from "express";

import userRouter from "./routes/user.route";
import { errorHandler } from "./middlewares/error.middleware";

// Create Express app
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/v1/users", userRouter);

// Error handling middleware
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});