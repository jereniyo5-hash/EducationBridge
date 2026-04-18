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
    // 1. Add avatar_url to users table
    console.log('Adding avatar_url to users...');
    await pool.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar_url TEXT');
    console.log('Added avatar_url.');

    // 2. Create testimonials table
    console.log('Creating testimonials table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL,
        comment TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Created testimonials table.');
    
    // Add default initial testimonials so the site does not look empty
    const test = await pool.query('SELECT COUNT(*) FROM testimonials');
    if (parseInt(test.rows[0].count) === 0) {
        await pool.query(`
            INSERT INTO testimonials (name, role, comment) VALUES 
            ('Jeremie Niyogisubizo', 'Student', 'It''s amazing to see this! I hadn''t seen this before. Thank you for the opportunity.'),
            ('Cody Firmino', 'Student', 'The assessments helped me prepare so well for my national exams. Highly recommended!')
        `);
        console.log('Added initial dummy testimonies.');
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    pool.end();
  }
}

run();
