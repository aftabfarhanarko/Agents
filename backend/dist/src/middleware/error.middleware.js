"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, _request, response, _next) => {
    if (error instanceof SyntaxError && 'body' in error) {
        response.status(400).json({
            success: false,
            message: 'Invalid JSON body. Send a valid JSON object, for example: {"id": 1, "name": "Ayesha Rahman", "email": "ayesha@example.com"}.',
        });
        return;
    }
    console.error(error);
    response.status(500).json({
        success: false,
        message: 'Internal server error',
    });
};
exports.errorHandler = errorHandler;
