// ============================================
// Habit Routes
// ============================================

const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController');
const authMiddleware = require('../middleware/authMiddleware');

// All habit routes require authentication
router.use(authMiddleware);

// GET /api/habits - Get all habits
router.get('/', habitController.getAllHabits);

// GET /api/habits/:id - Get single habit
router.get('/:id', habitController.getHabitById);

// POST /api/habits - Create new habit
router.post('/', habitController.createHabit);

// PUT /api/habits/:id - Update habit
router.put('/:id', habitController.updateHabit);

// DELETE /api/habits/:id - Delete habit
router.delete('/:id', habitController.deleteHabit);

// PATCH /api/habits/:id/complete - Mark habit complete
router.patch('/:id/complete', habitController.markComplete);

module.exports = router;
