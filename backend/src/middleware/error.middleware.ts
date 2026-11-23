import type { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof SyntaxError && 'body' in error) {
    response.status(400).json({
      success: false,
      message: 'Invalid JSON body. Send a valid JSON object, for example: {"name": "Ayesha Rahman", "email": "ayesha@example.com", "password": "your-password"}.',
    });
    return;
  }

  console.error(error);

  response.status(500).json({
    success: false,
    message: 'Internal server error',
  });
};
