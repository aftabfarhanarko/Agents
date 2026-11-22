import { Pool } from 'pg';

// These values come from backend/.env. Do not commit the real password.
export const database = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'pricktise',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
});

export async function connectToDatabase(): Promise<void> {
  const result = await database.query('SELECT 1');
  if (result.rowCount !== 1) {
    throw new Error('PostgreSQL connection check returned no result');
  }
}

export const checkDatabaseConnection = connectToDatabase;
