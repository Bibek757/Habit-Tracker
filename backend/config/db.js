// ============================================
// MySQL Database Connection
// ============================================

const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'habit_tracker',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Use promise-based pool for async/await
const db = pool.promise();

// Test database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Database Connection Failed:', err.message);
    console.error('   Make sure MySQL is running and credentials are correct.');
  } else {
    console.log('✅ Connected to MySQL Database: ' + process.env.DB_NAME);
    connection.release();
  }
});

module.exports = db;
