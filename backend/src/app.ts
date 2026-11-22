import "dotenv/config";

import cors from "cors";
import express from "express";

import apiRouter from "./routes";
import { errorHandler } from "./middleware/error.middleware";
import { notFound } from "./middleware/not-found.middleware";

// Initialize Express Application
const app = express();

// Application-wide Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend API is running successfully",
    timestamp: new Date().toISOString(),
  });
});

// Register API Routes
app.use("/api", apiRouter);

// Handle Unknown Routes
app.use(notFound);

// Global Error Handler (Must be last)
app.use(errorHandler);

export default app;
