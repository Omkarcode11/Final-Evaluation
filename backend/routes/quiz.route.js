const express = require("express");
const router = express.Router();
const {
  createQuiz,
  deleteQuizById,
  getQuizById,
  getQuestions,
  updateQuiz,
  updateQuestions,
  getQuizByIdOpen,
  getResult,
  increaseQuestionImpression,
} = require("../controllers/quiz.controller");
const { protect } = require("../middlewares/auth.route");

router.post("/", protect, createQuiz);
router.get("/:id", protect, getQuizById);
router.delete("/:id", protect, deleteQuizById);

router.get("/questions/:id", protect, getQuestions);
router.put("/questions/:id", protect, updateQuestions);

router.get("/startQuiz/:id", getQuizByIdOpen);
router.get("/increaseQuestionImpression/:id",increaseQuestionImpression)
router.post("/getResult", getResult);

module.exports = router;
