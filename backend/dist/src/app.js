"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const error_middleware_1 = require("./middleware/error.middleware");
const not_found_middleware_1 = require("./middleware/not-found.middleware");
// Initialize Express Application
const app = (0, express_1.default)();
// Application-wide Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Health Check
app.get("/health", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Backend API is running successfully",
        timestamp: new Date().toISOString(),
    });
});
// Register API Routes
app.use("/api", routes_1.default);
// Handle Unknown Routes
app.use(not_found_middleware_1.notFound);
// Global Error Handler (Must be last)
app.use(error_middleware_1.errorHandler);
exports.default = app;
