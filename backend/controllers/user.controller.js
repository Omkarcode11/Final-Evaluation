const User = require("../models/User");

exports.getMyQuizStats = async (req, res) => {
  try {
    let id = req.user._id;
    let userInfo = await User.findById(id).populate("quizzes").populate('questions')

    let totalQuestions = 0 
    let totalImpression = 0
    for(let ques of userInfo.quizzes){
        totalQuestions += ques.questions.length
        totalImpression += ques.impression
    }

    let data = {
        quizCreated : userInfo.quizzes.length,
        totalQuestions,
        totalImpression
    }


    return res.status(200).json({data});
  } catch (err) {
    res.status(500).send(err);
    console.log(err.message);
  }
};
