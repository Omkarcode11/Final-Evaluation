const Quiz = require("../models/Quiz");
const Question = require("../models/Question");

// Create a new quiz
exports.createQuiz = async (req, res) => {
  try {
    const { quizName, typeOfQuiz, questions } = req.body;
    let allQuestion = [];

    const quiz = await Quiz.create({
      quizName,
      typeOfQuiz,
      questions: allQuestion,
      author: req.user._id,
    });

    for (let question of questions) {
      question.quizId = quiz.id;
      let ques = await Question.create(question);
      allQuestion.push(ques.id);
    }

    quiz.questions = [...allQuestion];
    await quiz.save()

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
