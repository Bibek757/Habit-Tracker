// ============================================
// User Routes
// ============================================

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// All user routes require authentication
router.use(authMiddleware);

// GET /api/user/profile - Get user profile
router.get('/profile', userController.getProfile);

// PUT /api/user/profile - Update profile
router.put('/profile', userController.updateProfile);

// PUT /api/user/change-password - Change password
router.put('/change-password', userController.changePassword);

module.exports = router;
