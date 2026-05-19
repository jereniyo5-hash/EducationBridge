const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function run() {
  let retries = 5;
  while (retries > 0) {
    try {
      const client = await pool.connect();
      await client.query(`
        CREATE TABLE IF NOT EXISTS chat_messages (
            id SERIAL PRIMARY KEY,
            sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            receiver_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            content TEXT,
            file_url TEXT,
            file_type VARCHAR(50),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `);
      client.release();
      console.log('chat_messages table created successfully');
      process.exit(0);
    } catch (err) {
      console.error('Error creating table:', err);
      retries--;
      console.log('Retrying...', retries, 'attempts left');
      await new Promise(res => setTimeout(res, 2000));
    }
  }
  process.exit(1);
}
run();
