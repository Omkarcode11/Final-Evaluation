const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: [{
    type: String,
    required: true
  }],
  pollImpression: [{
    type: Number,
    default: 0
  }],
  answer: {
    type: Number,
    required: true
  },
  timer: {
    type: Number,
    default: 0
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  }
},{timestamps:true});

module.exports = mongoose.model('Question', questionSchema);
