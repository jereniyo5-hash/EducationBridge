const { Pool } = require('pg');
const bcrypt = require('bcrypt');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function makeAdmin() {
  try {
    const passwordHash = await bcrypt.hash('123456', 10);
    const fullName = 'Niyogisubizo jeremie';
    const username = 'jeremie';
    const email = 'jeremie@example.com';
    const role = 'admin';

    // Check if user exists
    const checkRes = await pool.query('SELECT * FROM users WHERE full_name ILIKE $1 OR username = $2', [fullName, username]);
    
    if (checkRes.rows.length > 0) {
      // Update existing user
      const user = checkRes.rows[0];
      await pool.query(
        'UPDATE users SET role = $1, password_hash = $2, full_name = $3 WHERE id = $4',
        ['admin', passwordHash, fullName, user.id]
      );
      console.log('Updated existing user to admin. Avatar URL:', user.avatar_url);
    } else {
      // Insert new user
      await pool.query(
        'INSERT INTO users (role, full_name, username, email, phone, password_hash) VALUES ($1, $2, $3, $4, $5, $6)',
        ['admin', fullName, username, email, '0000000000', passwordHash]
      );
      console.log('Created new admin user.');
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    process.exit(0);
  }
}

makeAdmin();
