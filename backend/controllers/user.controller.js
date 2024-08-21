const User = require("../models/User");

exports.getMyQuizStats = async (req, res) => {
  try {
    let id = req.user._id;
    let userInfo = await User.findById(id)
      .populate("quizzes")
      .populate("questions");

    let totalQuestions = 0;
    let totalImpression = 0;
    for (let ques of userInfo.quizzes) {
      totalQuestions += ques.questions.length;
      totalImpression += ques.impression;
    }

    let data = {
      quizCreated: userInfo.quizzes.length,
      totalQuestions,
      totalImpression,
    };

    return res.status(200).json({ data });
  } catch (err) {
    res.status(500).send(err);
    console.log(err.message);
  }
};

exports.getTrendingQuiz = async (req, res) => {
  try {
    let id = req.user._id;
    let quizzes = await User.findById(id)
      .populate({
        path: "quizzes",
        match: { impression: { $gt: 10 } }, // Filters quizzes with impression greater than 10
        options: { sort: { createdAt: 1 } }, // Sorts by createdAt in ascending order
      })
      .select("quizzes");

    return res.status(200).json(quizzes);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
};

exports.getMyQuizzes = async (req, res) => {
  try {
    let id = req.user._id;
    let quizzes = await User.findById(id).populate("quizzes").select("quizzes");
    return res.status(200).json(quizzes);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
};


