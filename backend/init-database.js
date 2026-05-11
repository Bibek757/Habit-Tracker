// ============================================
// Database Initialization Script
// ============================================

const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Create connection to MySQL (without selecting database)
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  port: process.env.DB_PORT || 3306,
  multipleStatements: true,
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Connection Error:', err.message);
    process.exit(1);
  }
  console.log('✅ Connected to MySQL Server');

  // Read schema file
  const schemaPath = path.join(__dirname, 'database', 'schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');

  // Execute schema
  connection.query(schema, (error, results) => {
    if (error) {
      console.error('❌ Database Setup Error:', error);
      connection.end();
      process.exit(1);
    }

    console.log('✅ Database setup completed successfully!');
    console.log('   - Database: habit_tracker');
    console.log('   - Tables created: users, habits, habit_completions, progress');
    console.log('   - Sample user created (email: test@example.com, password: password123)');
    
    connection.end();
    process.exit(0);
  });
});
