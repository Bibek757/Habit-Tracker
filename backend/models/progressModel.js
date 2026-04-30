// ============================================
// Progress Model - Database Queries
// ============================================

const db = require('../config/db');

const Progress = {
  // Get weekly progress (last 7 days)
  getWeeklyProgress: async (userId) => {
    const [rows] = await db.query(
      `SELECT 
         DATE(completion_date) as date,
         DAYNAME(completion_date) as day_name,
         COUNT(*) as completed_count
       FROM habit_completions
       WHERE user_id = ? 
         AND completion_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
       GROUP BY DATE(completion_date)
       ORDER BY date ASC`,
      [userId]
    );
    return rows;
  },

  // Get monthly progress (last 4 weeks)
  getMonthlyProgress: async (userId) => {
    const [rows] = await db.query(
      `SELECT 
         WEEK(completion_date) as week_number,
         COUNT(*) as completed_count,
         (SELECT COUNT(*) FROM habits WHERE user_id = ?) as total_habits
       FROM habit_completions
       WHERE user_id = ? 
         AND completion_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
       GROUP BY WEEK(completion_date)
       ORDER BY week_number ASC`,
      [userId, userId]
    );
    return rows;
  },

  // Get streak data (last 14 days)
  getStreakData: async (userId) => {
    const [rows] = await db.query(
      `SELECT 
         DATE(completion_date) as date,
         COUNT(*) as count
       FROM habit_completions
       WHERE user_id = ? 
         AND completion_date >= DATE_SUB(CURDATE(), INTERVAL 14 DAY)
       GROUP BY DATE(completion_date)
       ORDER BY date ASC`,
      [userId]
    );
    return rows;
  },

  // Get overall stats
  getOverallStats: async (userId) => {
    const [totalHabits] = await db.query(
      'SELECT COUNT(*) as total FROM habits WHERE user_id = ?',
      [userId]
    );

    const today = new Date().toISOString().split('T')[0];
    const [completedToday] = await db.query(
      'SELECT COUNT(*) as completed FROM habit_completions WHERE user_id = ? AND completion_date = ?',
      [userId, today]
    );

    const [totalCompletions] = await db.query(
      'SELECT COUNT(*) as total FROM habit_completions WHERE user_id = ?',
      [userId]
    );

    const [bestStreak] = await db.query(
      'SELECT MAX(streak_count) as best_streak FROM habits WHERE user_id = ?',
      [userId]
    );

    return {
      totalHabits: totalHabits[0].total,
      completedToday: completedToday[0].completed,
      pendingToday: totalHabits[0].total - completedToday[0].completed,
      totalCompletions: totalCompletions[0].total,
      bestStreak: bestStreak[0].best_streak || 0,
    };
  },

  // Get completion rate
  getCompletionRate: async (userId, days = 30) => {
    const [rows] = await db.query(
      `SELECT 
         COUNT(DISTINCT completion_date) as completed_days,
         ? as total_days,
         (SELECT COUNT(*) FROM habits WHERE user_id = ?) as total_habits,
         COUNT(*) as total_completions
       FROM habit_completions
       WHERE user_id = ? 
         AND completion_date >= DATE_SUB(CURDATE(), INTERVAL ? DAY)`,
      [days, userId, userId, days]
    );
    return rows[0];
  },
};

module.exports = Progress;
