const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Game schema
const sudokuSchema = new Schema({
  gameID: {
    type: Number,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'], 
    required: true
  },
  size: {
    type: String,
    enum: ['4x4', '9x9'], 
    required: true
  },
  game: {
    type: [[Number]], 
    required: true
  },
  solution: {
    type: [[Number]], 
    required: true
  }
});

// Create the model based on the schema
const Sudoku = mongoose.model('Sudoku', sudokuSchema);
const SudokuArray = mongoose.model('SudokuArray', sudokuSchema, 'Sudoku_Array');

module.exports = Sudoku;
module.exports = SudokuArray;
