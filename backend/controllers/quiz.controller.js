const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
const User = require("../models/User");

// Create a new quiz
exports.createQuiz = async (req, res) => {
  try {
    let userId = req.user._id;
    const { quizName, typeOfQuiz, questions } = req.body;
    let allQuestion = [];

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
    const quizzes = await Quiz.find().populate("author").populate("questions").select('_id quizName impression createdAt');
    res.status(200).json(quizzes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getQuizById = async (req,res)=>{
  try{
    let {id} = req.params
    const quiz = await Quiz.findById(id).populate('questions')
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    if (quiz.author.toString() !== req.user._id.toString()) {
      return res.status(400).json({ message: "Unauthorized access" });
    }

    return res.status(200).json(quiz)

  }catch(err){
    console.log(err.message)
    return res.status(500).json(err)
  }
  
}

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

    return res.status(200).json({message:"success"})
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add more methods as needed for fetching single quiz, updating quiz, etc.
