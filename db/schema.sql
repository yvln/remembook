DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS remembox CASCADE;
DROP TABLE IF EXISTS articles CASCADE;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  login VARCHAR NOT NULL UNIQUE,
  fname VARCHAR NOT NULL,
  lname VARCHAR NOT NULL,
  email VARCHAR NOT NULL UNIQUE,
  password_digest VARCHAR NOT NULL,
  user_image_url VARCHAR
);

CREATE TABLE remembox (
  remembox_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  rmbdate VARCHAR NOT NULL,
  category VARCHAR NOT NULL,
  title VARCHAR NOT NULL,
  description VARCHAR,
  picture VARCHAR,
  mood VARCHAR,
  mood_url VARCHAR
);

CREATE TABLE magazines (
  magazine_id SERIAL PRIMARY KEY,
  magazine_name VARCHAR,
  magazine_logo VARCHAR
);
