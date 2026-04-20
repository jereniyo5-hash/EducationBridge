const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function setupDatabase() {
    console.log("Connecting to the database at:", process.env.DATABASE_URL.split('@')[1] || process.env.DATABASE_URL);
    
    // Create connection pool
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        // Read the SQL file
        const sqlFilePath = path.join(__dirname, 'database.sql');
        console.log(`Reading SQL commands from ${sqlFilePath}...`);
        const sqlString = fs.readFileSync(sqlFilePath, 'utf8');

        // Execute the SQL file on the Postgres database
        console.log("Executing SQL schema...");
        await pool.query(sqlString);
        
        console.log("✅ Success! Your Render database is now fully set up with all your tables.");
    } catch (error) {
        console.error("❌ Error setting up the database:", error);
    } finally {
        // Close the connection
        await pool.end();
    }
}

setupDatabase();
