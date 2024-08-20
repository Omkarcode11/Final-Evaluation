const express = require('express');
const router = express.Router();
const { createQuiz, getQuizzes } = require('../controllers/quizController');
const { protect } = require('../middleware/authMiddleware');

// Route for creating a new quiz
router.post('/', protect, createQuiz);

// Route for getting all quizzes
router.get('/', getQuizzes);

// Add more routes as needed (e.g., get single quiz, update quiz, etc.)

module.exports = router;
