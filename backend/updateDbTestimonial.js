/* eslint-env node */
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function run() {
  try {
    console.log('Adding avatar_url to testimonials...');
    await pool.query('ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS avatar_url TEXT');
    console.log('Done!');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    pool.end();
  }
}

run();
