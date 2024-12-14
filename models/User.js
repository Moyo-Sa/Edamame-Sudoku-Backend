const mongoose = require('mongoose');

// User Schema
const userSchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true
    },
    gamesPlayed: {
      type: Number,
      default: 0
    },
    wins: {
      type: Number,
      default: 0
    },
    
  });
  
  
  module.exports = mongoose.model('User', UserSchema);