const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
  name: {
    type: string,
    required: true,
  },
  accessibility: {
    type: String,
    required: true,
  },
  friendliness: {
    type: String,
    required: true,
  },
  likes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  founder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  comments:[{
    types: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  location: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Cat', catSchema);
