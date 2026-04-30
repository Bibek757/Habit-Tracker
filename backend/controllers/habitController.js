// ============================================
// Habit Controller - CRUD Operations
// ============================================

const Habit = require('../models/habitModel');

// ---- GET /api/habits ----
exports.getAllHabits = async (req, res) => {
  try {
    const userId = req.user.id;
    const habits = await Habit.findAllByUser(userId);

    // Check completion status for each habit today
    const habitsWithStatus = await Promise.all(
      habits.map(async (habit) => {
        const completedToday = await Habit.isCompletedToday(habit.habit_id, userId);
        return {
          ...habit,
          completed_today: completedToday,
        };
      })
    );

    res.status(200).json({
      success: true,
      message: 'Habits retrieved successfully',
      data: habitsWithStatus,
    });
  } catch (error) {
    console.error('Get Habits Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch habits',
      error: error.message,
    });
  }
};

// ---- GET /api/habits/:id ----
exports.getHabitById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const habit = await Habit.findById(id, userId);

    if (!habit) {
      return res.status(404).json({
        success: false,
        message: 'Habit not found',
      });
    }

    res.status(200).json({
      success: true,
      data: habit,
    });
  } catch (error) {
    console.error('Get Habit Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch habit',
      error: error.message,
    });
  }
};

// ---- POST /api/habits ----
exports.createHabit = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      habit_name, description, category,
      start_date, end_date, frequency, reminder_time, priority,
    } = req.body;

    // Validation
    if (!habit_name || !category || !start_date) {
      return res.status(400).json({
        success: false,
        message: 'Habit name, category, and start date are required',
      });
    }

    const result = await Habit.create({
      user_id: userId,
      habit_name,
      description: description || '',
      category,
      start_date,
      end_date,
      frequency: frequency || 'Daily',
      reminder_time,
      priority: priority || 'Medium',
    });

    res.status(201).json({
      success: true,
      message: 'Habit created successfully',
      data: {
        habit_id: result.insertId,
        habit_name,
        category,
      },
    });
  } catch (error) {
    console.error('Create Habit Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create habit',
      error: error.message,
    });
  }
};

// ---- PUT /api/habits/:id ----
exports.updateHabit = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Check if habit exists
    const existing = await Habit.findById(id, userId);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Habit not found',
      });
    }

    const result = await Habit.update(id, userId, req.body);

    res.status(200).json({
      success: true,
      message: 'Habit updated successfully',
    });
  } catch (error) {
    console.error('Update Habit Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update habit',
      error: error.message,
    });
  }
};

// ---- DELETE /api/habits/:id ----
exports.deleteHabit = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Check if habit exists
    const existing = await Habit.findById(id, userId);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Habit not found',
      });
    }

    await Habit.delete(id, userId);

    res.status(200).json({
      success: true,
      message: 'Habit deleted successfully',
    });
  } catch (error) {
    console.error('Delete Habit Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete habit',
      error: error.message,
    });
  }
};

// ---- PATCH /api/habits/:id/complete ----
exports.markComplete = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Check if habit exists
    const existing = await Habit.findById(id, userId);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Habit not found',
      });
    }

    // Check if already completed today
    const alreadyDone = await Habit.isCompletedToday(id, userId);
    if (alreadyDone) {
      return res.status(400).json({
        success: false,
        message: 'Habit already completed today',
      });
    }

    await Habit.markComplete(id, userId);

    res.status(200).json({
      success: true,
      message: 'Habit marked as completed',
    });
  } catch (error) {
    console.error('Mark Complete Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark habit as complete',
      error: error.message,
    });
  }
};
