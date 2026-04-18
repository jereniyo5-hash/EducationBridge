-- Drop the existing table if it exists to ensure a clean slate
DROP TABLE IF EXISTS users CASCADE;

-- Create the users table with the correct schema
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    role VARCHAR(50) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50) NOT NULL,
    password_hash TEXT NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create table for exams uploaded by teachers
CREATE TABLE IF NOT EXISTS teacher_exams (
    id SERIAL PRIMARY KEY,
    teacher_id INTEGER REFERENCES users(id),
    teacher_name VARCHAR(255) NOT NULL,
    year_level VARCHAR(50) NOT NULL,
    subject_name VARCHAR(100) NOT NULL,
    file_url TEXT NOT NULL,
    time_limit INTEGER NOT NULL,
    attempts_allowed VARCHAR(20) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create table for user testimonials
CREATE TABLE IF NOT EXISTS testimonials (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    comment TEXT NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
