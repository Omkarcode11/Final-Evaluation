const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth.route');
const { getMyQuizStats, getTrendingQuiz } = require('../controllers/user.controller');

router.get('/getstats', protect, getMyQuizStats);
router.get('/getTrendingQuiz', protect, getTrendingQuiz);
router.get('/getMyQuizzes',protect,getMyQuizzes)

module.exports = router;
