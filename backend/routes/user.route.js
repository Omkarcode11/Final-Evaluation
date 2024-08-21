const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth.route');
const { getMyQuizStats } = require('../controllers/user.controller');

// Route for creating a new quiz
router.get('/getstats', protect, getMyQuizStats);

// Route for getting all quizzes
// router.get('/', getQuizzes);

// Add more routes as needed (e.g., get single quiz, update quiz, etc.)

module.exports = router;
