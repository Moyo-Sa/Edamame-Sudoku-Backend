const express = require('express');
const router = express.Router();
const Sudoku = require('../models/Sudoku');
//const SudokuArray = require('../models/Sudoku');
const {undoUntilCorrect, checkProgress} = require('../controllers/sudoku')


// Route to get all sudoku puzzles
router.get('/puzzles', async (req, res) => {
  try {
    const puzzles = await Sudoku.find({});
    res.json(puzzles);
  } catch (err) {
    res.status(500).send('Error fetching puzzles');
  }
});

// Route to get a specific sudoku puzzle by id
router.get('/puzzle/:gameID', async (req, res) => {
  console.log('Fetching puzzles for gameID:', req.params.gameID);
  try {
    const puzzle = await Sudoku.findOne({ gameID: req.params.gameID });
    if (!puzzle) {
      return res.status(404).send('Puzzle not found');
    }
    res.json(puzzle);
  } catch (err) {
    res.status(500).send('Error fetching puzzle');
  }
});

// Route to get only the game array of a specific sudoku puzzle by gameID
router.get('/puzzle/:gameID/gameArray', async (req, res) => {
  console.log('Fetching game array for gameID:', req.params.gameID);
  try {
    // Fetch only the 'game' field for the specified gameID
    const puzzle = await Sudoku.findOne({ gameID: req.params.gameID }).select('game');
    if (!puzzle) {
      return res.status(404).send('Puzzle not found');
    }
    res.json(puzzle.game); // Send only the game array in the response
  } catch (err) {
    res.status(500).send('Error fetching game array');
  }
});

// Route to get only the game array of a specific sudoku puzzle by difficulty and size
router.get('/puzzle/:difficulty/:size/:gameID/gameArray', async (req, res) => {
  const { difficulty, size, gameID } = req.params;
  console.log(`Fetching game array for difficulty: ${difficulty}, size: ${size}, gameID: ${gameID}`);
  try {
    // Fetch only the 'game' field for the specified difficulty and size
    const puzzle = await Sudoku.findOne(
      { difficulty, size, gameID }, // Match both difficulty and size
      { game: 1, _id: 0 }   // Select only the game field and exclude _id
    );
    if (!puzzle) {
      return res.status(404).send('Puzzle not found');
    }
    res.json(puzzle.game); // Send only the game array in the response
  } catch (err) {
    console.error('Error fetching game array:', err);
    res.status(500).send('Error fetching game array');
  }
});


// Route to get only the solution array of a specific sudoku puzzle by difficulty and size
router.get('/puzzle/:difficulty/:size/:gameID/solutionArray', async (req, res) => {
  const { difficulty, size, gameID } = req.params;
  console.log(`Fetching solution array for difficulty: ${difficulty}, size: ${size}, gameID: ${gameID}`);
  try {
    // Fetch only the 'game' field for the specified difficulty and size
    const puzzle = await Sudoku.findOne(
      { difficulty, size, gameID }, // Match both difficulty and size
      { solution: 1, _id: 0 }   // Select only the solution field and exclude _id
    );
    if (!puzzle) {
      return res.status(404).send('Puzzle not found');
    }
    res.json(puzzle.solution); // Send only the solution array in the response
  } catch (err) {
    console.error('Error fetching solution array:', err);
    res.status(500).send('Error fetching solution array');
  }
});

// Route to check the grid until the last correct state
router.post('/undoUntilCorrect', undoUntilCorrect);

// Route to check the grid until the last user's move
router.post('/checkProgress', checkProgress);




module.exports = router;
