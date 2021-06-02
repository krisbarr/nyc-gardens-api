const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    enum: ['flowers', 'veggies', 'repairs', 'clean-up', 'hours', 'questions']
  }
},
{
  timestamps: true
})

module.exports = commentSchema
