const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  facebookId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  cats: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cat',
  }],
  location: {
    type: String,
    default: null
  }
});

module.exports = mongoose.model('User', userSchema);
