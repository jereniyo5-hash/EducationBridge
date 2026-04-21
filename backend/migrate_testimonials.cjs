
const pg = require('pg');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

async function migrate() {
  try {
    console.log('Starting migration...');
    
    // Add is_approved column to testimonials
    await pool.query(`
      ALTER TABLE testimonials 
      ADD COLUMN IF NOT EXISTS is_approved BOOLEAN DEFAULT FALSE;
    `);
    console.log('Added is_approved column to testimonials table.');

    // Ensure Admin role can be used (if it's a constraint, but it's currently VARCHAR(50))
    
    // Create an admin user if not exists (optional, but helpful for testing)
    // password: 'adminpassword' -> hashed
    // For now, I'll just let the user sign up or I'll manually promote a user later.
    
    console.log('Migration completed successfully.');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await pool.end();
  }
}

migrate();
