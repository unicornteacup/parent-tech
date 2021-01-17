-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS companies CASCADE;
CREATE TABLE companies (
  id SERIAL PRIMARY KEY NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  company_contact_name VARCHAR(255),
  contact_email VARCHAR(255),
  company_url VARCHAR(2048) NOT NULL,
  description TEXT,
  company_logo_url VARCHAR(2048) NOT NULL,
  email VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS categories CASCADE;
CREATE TABLE articles (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  body TEXT
);

DROP TABLE IF EXISTS company_categories CASCADE;
CREATE TABLE company_categories (
  id SERIAL PRIMARY KEY NOT NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS articles CASCADE;
CREATE TABLE articles (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  body TEXT
);


