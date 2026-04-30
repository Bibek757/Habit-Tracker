// ============================================
// Progress Routes
// ============================================

const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');
const authMiddleware = require('../middleware/authMiddleware');

// All progress routes require authentication
router.use(authMiddleware);

// GET /api/progress/weekly - Weekly progress data
router.get('/weekly', progressController.getWeeklyProgress);

// GET /api/progress/monthly - Monthly progress data
router.get('/monthly', progressController.getMonthlyProgress);

// GET /api/progress/streak - Streak data
router.get('/streak', progressController.getStreakData);

// GET /api/progress/stats - Overall stats
router.get('/stats', progressController.getOverallStats);

module.exports = router;
