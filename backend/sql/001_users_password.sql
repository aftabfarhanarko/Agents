-- Run this once against the PostgreSQL database used by the backend.
-- The table creation supports a fresh database; the ALTER supports an existing users table.
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

ALTER TABLE users ADD COLUMN IF NOT EXISTS password TEXT;
