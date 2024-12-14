const mongoose = require('mongoose');

const GameSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard']
    },
    startTime: {
      type: Date
    },
    endTime: {
      type: Date
    },
    solved: {
      type: Boolean,
      default: false
    },
    board: {
      type: [[Number]] // 2D array representing the Sudoku board
    }
  });

  module.exports = mongoose.model('Game', GameSchema);