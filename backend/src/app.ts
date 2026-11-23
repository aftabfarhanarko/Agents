import "dotenv/config";

import cors from "cors";
import express from "express";
import { existsSync } from "node:fs";
import path from "node:path";
import user from "./routes/auth.routes";
import { errorHandler } from "./middleware/error.middleware";
import { notFound } from "./middleware/not-found.middleware";

// Initialize Express Application
const app = express();

// Application-wide Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const publicDirectory = [
  path.resolve(process.cwd(), "backend/public"),
  path.resolve(process.cwd(), "public"),
  path.resolve(__dirname, "../public"),
  path.resolve(__dirname, "../../public"),
].find(existsSync);
if (publicDirectory) app.use(express.static(publicDirectory));

// Register API Routes
app.use("/api", user);

app.use(notFound);
app.use(errorHandler);

export default app;
