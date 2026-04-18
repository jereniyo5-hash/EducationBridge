const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function createTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS student_submissions (
        id SERIAL PRIMARY KEY,
        exam_id INTEGER REFERENCES teacher_exams(id) ON DELETE CASCADE,
        student_id INTEGER REFERENCES users(id),
        student_name VARCHAR(255) NOT NULL,
        answers_text TEXT NOT NULL,
        score INTEGER,
        submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(query);
    console.log("student_submissions table created successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error creating table:", err);
    process.exit(1);
  }
}

createTable();
