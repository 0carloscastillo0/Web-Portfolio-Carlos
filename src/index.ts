import express from "express";

import userRouter from "./routes/user.route";

// Create Express app
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/v1/users", userRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});