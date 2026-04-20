const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function createTable() {
  const query = `
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
  `;
  try {
    await pool.query(query);
    console.log("teacher_exams table created successfully");
  } catch (err) {
    console.error("Error creating table", err);
  } finally {
    pool.end();
  }
}

createTable();
