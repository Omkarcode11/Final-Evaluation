const express = require('express');
const router = express.Router();
const { createQuiz, getQuizzes, deleteQuizById } = require('../controllers/quiz.controller');
const { protect } = require('../middlewares/auth.route');

router.post('/', protect, createQuiz);

router.get('/', getQuizzes);

router.delete('/:id',deleteQuizById)

module.exports = router;
