// ============================================
// Habit Model - Database Queries
// ============================================

const db = require('../config/db');

const Habit = {
  // Get all habits for a user
  findAllByUser: async (userId) => {
    const [rows] = await db.query(
      'SELECT * FROM habits WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    return rows;
  },

  // Get habit by ID
  findById: async (id, userId) => {
    const [rows] = await db.query(
      'SELECT * FROM habits WHERE habit_id = ? AND user_id = ?',
      [id, userId]
    );
    return rows[0];
  },

  // Create new habit
  create: async (habitData) => {
    const {
      user_id, habit_name, description, category,
      start_date, end_date, frequency, reminder_time, priority,
    } = habitData;

    const [result] = await db.query(
      `INSERT INTO habits 
       (user_id, habit_name, description, category, start_date, end_date, frequency, reminder_time, priority) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [user_id, habit_name, description, category, start_date, end_date || null, frequency, reminder_time || null, priority]
    );
    return result;
  },

  // Update habit
  update: async (id, userId, habitData) => {
    const {
      habit_name, description, category,
      start_date, end_date, frequency, reminder_time, priority,
    } = habitData;

    const [result] = await db.query(
      `UPDATE habits SET 
       habit_name = ?, description = ?, category = ?, 
       start_date = ?, end_date = ?, frequency = ?, 
       reminder_time = ?, priority = ?
       WHERE habit_id = ? AND user_id = ?`,
      [habit_name, description, category, start_date, end_date || null, frequency, reminder_time || null, priority, id, userId]
    );
    return result;
  },

  // Delete habit
  delete: async (id, userId) => {
    const [result] = await db.query(
      'DELETE FROM habits WHERE habit_id = ? AND user_id = ?',
      [id, userId]
    );
    return result;
  },

  // Mark habit as completed (log today's completion)
  markComplete: async (habitId, userId) => {
    const today = new Date().toISOString().split('T')[0];

    // Insert completion record
    const [result] = await db.query(
      `INSERT IGNORE INTO habit_completions (habit_id, user_id, completion_date) VALUES (?, ?, ?)`,
      [habitId, userId, today]
    );

    // Update streak count
    await db.query(
      'UPDATE habits SET streak_count = streak_count + 1 WHERE habit_id = ? AND user_id = ?',
      [habitId, userId]
    );

    return result;
  },

  // Check if habit is completed today
  isCompletedToday: async (habitId, userId) => {
    const today = new Date().toISOString().split('T')[0];
    const [rows] = await db.query(
      'SELECT * FROM habit_completions WHERE habit_id = ? AND user_id = ? AND completion_date = ?',
      [habitId, userId, today]
    );
    return rows.length > 0;
  },

  // Get total count for user
  getCount: async (userId) => {
    const [rows] = await db.query(
      'SELECT COUNT(*) as total FROM habits WHERE user_id = ?',
      [userId]
    );
    return rows[0].total;
  },

  // Get completed count for today
  getCompletedToday: async (userId) => {
    const today = new Date().toISOString().split('T')[0];
    const [rows] = await db.query(
      'SELECT COUNT(*) as completed FROM habit_completions WHERE user_id = ? AND completion_date = ?',
      [userId, today]
    );
    return rows[0].completed;
  },
};

module.exports = Habit;
