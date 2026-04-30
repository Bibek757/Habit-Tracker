// ============================================
// User Model - Database Queries
// ============================================

const db = require('../config/db');

const User = {
  // Find user by email
  findByEmail: async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },

  // Find user by username
  findByUsername: async (username) => {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
  },

  // Find user by ID
  findById: async (id) => {
    const [rows] = await db.query(
      'SELECT user_id, full_name, username, email, profile_photo, created_at FROM users WHERE user_id = ?',
      [id]
    );
    return rows[0];
  },

  // Create new user
  create: async (userData) => {
    const { full_name, username, email, password } = userData;
    const [result] = await db.query(
      'INSERT INTO users (full_name, username, email, password) VALUES (?, ?, ?, ?)',
      [full_name, username, email, password]
    );
    return result;
  },

  // Update user profile
  updateProfile: async (id, userData) => {
    const { full_name, email, username } = userData;
    const [result] = await db.query(
      'UPDATE users SET full_name = ?, email = ?, username = ? WHERE user_id = ?',
      [full_name, email, username, id]
    );
    return result;
  },

  // Update password
  updatePassword: async (id, hashedPassword) => {
    const [result] = await db.query(
      'UPDATE users SET password = ? WHERE user_id = ?',
      [hashedPassword, id]
    );
    return result;
  },
};

module.exports = User;
