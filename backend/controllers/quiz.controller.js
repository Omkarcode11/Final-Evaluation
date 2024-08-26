const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
const User = require("../models/User");

// Create a new quiz
exports.createQuiz = async (req, res) => {
  try {
    let userId = req.user._id;
    const { quizName, typeOfQuiz, questions } = req.body;
    let allQuestion = [];

    if (typeOfQuiz == "POLL") {
    }

    const quiz = await Quiz.create({
      quizName,
      typeOfQuiz,
      questions: allQuestion,
      author: userId,
    });

    for (let question of questions) {
      question.quizId = quiz.id;
      let ques = await Question.create(question);
      allQuestion.push(ques.id);
    }

    quiz.questions = [...allQuestion];
    await quiz.save();

    await User.findByIdAndUpdate(userId, { $push: { quizzes: quiz.id } });

    res.status(201).json(quiz);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all quizzes
exports.getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find()
      .populate("author")
      .populate("questions")
      .select("_id quizName impression createdAt");
    res.status(200).json(quizzes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getQuizById = async (req, res) => {
  try {
    let { id } = req.params;
    const quiz = await Quiz.findById(id)
      .select("_id quizName typeOfQuiz impression createdAt author")
      .populate({
        path: "questions",
        select: "question poll impression correctImpression",
      });
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    if (quiz.author.toString() !== req.user._id.toString()) {
      return res.status(400).json({ message: "Unauthorized access" });
    }

    return res.status(200).json(quiz);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json(err);
  }
};

exports.deleteQuizById = async (req, res) => {
  try {
    let id = req.params.id;
    let quiz = await Quiz.findById(id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    if (quiz.author.toString() !== req.user._id.toString()) {
      return res.status(400).json({ message: "Unauthorized access" });
    }

    await Quiz.findByIdAndDelete(id);

    await User.findByIdAndUpdate(req.user._id, {
      $pull: { quizzes: id },
    });

    return res.status(200).json({ message: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getQuestions = async (req, res) => {
  try {
    let { id } = req.params;
    let quiz = await Quiz.findById(id)
      .select("questions author typeOfQuiz")
      .populate({
        path: "questions",
        select: "optionType question options answer timer",
      });

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    if (quiz.author.toString() != req.user._id) {
      return res.status(400).json({ message: "Unauthorize" });
    }

    return res.status(200).json(quiz);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err.message);
  }
};

exports.updateQuestions = async (req, res) => {
  // Extracting quiz id from request parameters
  let { id } = req.params;
  // Extracting questions from request body
  let { questions } = req.body;

  try {
    // Find the quiz by id
    let quiz = await Quiz.findById(id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Check if the current user is the author of the quiz
    if (quiz.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    // Check if all questions exist in the quiz
    for (let question of questions) {
      if (!quiz.questions.includes(question._id)) {
        return res.status(400).json({ message: "Unauthorized access" });
      }
    }

    // Update each question individually
    for (let question of questions) {
      let updatedQuestion = await Question.findByIdAndUpdate(
        question._id,
        { $set: question },
        { new: true }
      );

      if (!updatedQuestion) {
        return res
          .status(500)
          .json({ message: "Failed to update the questions" });
      }
    }

    return res.status(200).json({ message: "Questions updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

exports.getQuizByIdOpen = async (req, res) => {
  try {
    let { id } = req.params;

    let quiz = await Quiz.findById(id)
      .populate({
        path: "questions",
        select: "_id optionType question options timer",
      })
      .select("quizName typeOfQuiz questions impression");

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    quiz.impression += 1;
    await quiz.save();

    for (let question of quiz.questions) {
    }

    return res.status(200).json(quiz);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
};

exports.increaseQuestion = async (req, res) => {
  try {
    let { id } = req.params;

    let question = await Question.findByIdAndUpdate(
      id,
      { $inc: { impression: 1 } },
      { new: true }
    );

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    return res.status(200).json({ message: "Success", question });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

exports.getResult = async (req, res) => {
  try {
    let { answers } = req.body;
    let score = 0;

    for (let ans of answers) {
      let question = await Question.findById(ans.id);
      if (question.answer == ans.answer) {
        question.correctImpression += 1;
        score++;
      }
      question.impression += 1;
      await question.save();
    }
    return res.status(200).json({ score });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
