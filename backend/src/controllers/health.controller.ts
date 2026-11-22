import type { RequestHandler } from 'express';
import { checkDatabaseConnection } from '../config/database';

export const getHealth: RequestHandler = (_request, response) => {
  response.status(200).json({ status: 'ok' });
};

export const getDatabaseHealth: RequestHandler = async (_request, response) => {
  try {
    await checkDatabaseConnection();
    response.status(200).json({ status: 'ok', database: 'connected' });
  } catch (error) {
    console.error('Database connection failed:', error);
    response.status(503).json({ status: 'error', database: 'disconnected' });
  }
};
