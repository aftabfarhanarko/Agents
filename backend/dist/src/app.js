"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const error_middleware_1 = require("./middleware/error.middleware");
const not_found_middleware_1 = require("./middleware/not-found.middleware");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', routes_1.default);
app.use(not_found_middleware_1.notFound);
app.use(error_middleware_1.errorHandler);
app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
});
