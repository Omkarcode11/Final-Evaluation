const express = require("express");
const router = express.Router();
const {
  createQuiz,
  deleteQuizById,
  getQuizById,
  getQuestions,
  updateQuiz,
  updateQuestions,
} = require("../controllers/quiz.controller");
const { protect } = require("../middlewares/auth.route");

router.post("/", protect, createQuiz);
router.get("/:id", protect, getQuizById);
router.delete("/:id", protect, deleteQuizById);

router.get("/questions/:id", protect, getQuestions);
router.put("/questions/:id", protect, updateQuestions);

module.exports = router;
