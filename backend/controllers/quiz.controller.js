const Quiz = require("../models/Quiz");
const Question = require("../models/Question");

// Create a new quiz
exports.createQuiz = async (req, res) => {
  try {
    const { quizName, typeOfQuiz, questions } = req.body;

    const quiz = new Quiz({
      quizName,
      typeOfQuiz,
      questions,
      author: req.user._id,
    });

    await quiz.save();
    res.status(201).json(quiz);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all quizzes
exports.getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate("author").populate("questions");
    res.status(200).json(quizzes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Add more methods as needed for fetching single quiz, updating quiz, etc.
