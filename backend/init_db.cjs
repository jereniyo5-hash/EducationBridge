const fs = require('fs');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function run() {
  try {
    const sql = fs.readFileSync('database.sql', 'utf-8');
    await pool.query(sql);
    console.log('Successfully initialized all tables in the Neon database!');
  } catch (err) {
    console.error('Error initializing database:', err);
  } finally {
    process.exit(0);
  }
}

run();
