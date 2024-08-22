const express = require('express');
const router = express.Router();
const { createQuiz, getQuizzes, deleteQuizById, getQuizById } = require('../controllers/quiz.controller');
const { protect } = require('../middlewares/auth.route');

router.post('/', protect, createQuiz);

// router.get('/', getQuizzes);
router.get('/:id', protect, getQuizById);

router.delete('/:id',protect,deleteQuizById)

module.exports = router;
