-- Create database (optional, if not already created)
-- CREATE DATABASE store_rating_db;

-- Switch to the database (for psql CLI)
-- \c store_rating_db;

-- USERS table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(60) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  address VARCHAR(400),
  role VARCHAR(20) CHECK (role IN ('admin', 'user', 'owner')) DEFAULT 'user'
);

-- STORES table
CREATE TABLE IF NOT EXISTS stores (
  id SERIAL PRIMARY KEY,
  name VARCHAR(60) NOT NULL,
  email VARCHAR(255),
  address VARCHAR(400),
  owner_id INTEGER REFERENCES users(id) ON DELETE SET NULL
);

-- RATINGS table
CREATE TABLE IF NOT EXISTS ratings (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  store_id INTEGER REFERENCES stores(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  UNIQUE (user_id, store_id)
);
