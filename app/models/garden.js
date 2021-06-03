const mongoose = require('mongoose')
const commentSchema = require('./comment')

const gardenSchema = new mongoose.Schema({
  parksId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  borough: {
    type: String,
    required: true
  },
  zipCode: {
    type: Number,
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [commentSchema]
}, {
  timestamps: true
})

module.exports = mongoose.model('Garden', gardenSchema)
