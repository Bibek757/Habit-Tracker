// ============================================
// Progress Controller - Analytics
// ============================================

const Progress = require('../models/progressModel');

// ---- GET /api/progress/weekly ----
exports.getWeeklyProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await Progress.getWeeklyProgress(userId);

    res.status(200).json({
      success: true,
      message: 'Weekly progress retrieved',
      data,
    });
  } catch (error) {
    console.error('Weekly Progress Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch weekly progress',
      error: error.message,
    });
  }
};

// ---- GET /api/progress/monthly ----
exports.getMonthlyProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await Progress.getMonthlyProgress(userId);

    res.status(200).json({
      success: true,
      message: 'Monthly progress retrieved',
      data,
    });
  } catch (error) {
    console.error('Monthly Progress Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch monthly progress',
      error: error.message,
    });
  }
};

// ---- GET /api/progress/streak ----
exports.getStreakData = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await Progress.getStreakData(userId);

    res.status(200).json({
      success: true,
      message: 'Streak data retrieved',
      data,
    });
  } catch (error) {
    console.error('Streak Data Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch streak data',
      error: error.message,
    });
  }
};

// ---- GET /api/progress/stats ----
exports.getOverallStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const stats = await Progress.getOverallStats(userId);
    const completionRate = await Progress.getCompletionRate(userId, 30);

    res.status(200).json({
      success: true,
      message: 'Overall stats retrieved',
      data: {
        ...stats,
        completionRate,
      },
    });
  } catch (error) {
    console.error('Overall Stats Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch stats',
      error: error.message,
    });
  }
};
