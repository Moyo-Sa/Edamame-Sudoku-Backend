// Controller function
const undoUntilCorrect = async (req, res) => {
    const { originalGrid, solution, historyStack } = req.body;
  
    if (
      !originalGrid ||
      !solution ||
      !historyStack ||
      originalGrid.length !== solution.length ||
      originalGrid[0].length !== solution[0].length
    ) {
      return res.status(400).json({ message: "Invalid input data" });
    }
  
    try {
      // Create a copy of the original grid to simulate re-applying moves
      let simulatedGrid = originalGrid.map(row => [...row]);
  
      // Find the first incorrect move
      let firstMistakeIndex = null;
  
      for (let i = 0; i < historyStack.length; i++) {
        const { row, col, value } = historyStack[i];
  
        // Apply the move
        simulatedGrid[row][col] = value;
  
        // Check if this move matches the solution
        if (solution[row][col] !== value) {
          // Found the first mistake
          firstMistakeIndex = i;
          break;
        }
      }
  
      let correctedGrid;
      if (firstMistakeIndex === null) {
        // No mistakes found; the puzzle remains as is
        correctedGrid = simulatedGrid;
      } else {
        // Revert to the state before the first mistake
        correctedGrid = originalGrid.map(row => [...row]);
  
        for (let i = 0; i < firstMistakeIndex; i++) {
          const { row, col, value } = historyStack[i];
          correctedGrid[row][col] = value;
        }
      }
  
      return res.status(200).json({ correctedGrid, firstMistakeIndex });
    } catch (error) {
      console.error("Error in undoUntilCorrect:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };


  const checkProgress = (req, res) => {
    const { currentGrid, solutionGrid } = req.body;
  
    if (!currentGrid || !solutionGrid) {
      return res.status(400).send("Current grid and solution grid are required.");
    }
  
    try {
      const incorrectCells = [];
  
      // Compare the user's grid with the solution grid
      for (let i = 0; i < currentGrid.length; i++) {
        for (let j = 0; j < currentGrid[i].length; j++) {
          if (
            currentGrid[i][j] !== null &&
            currentGrid[i][j] !== 0 &&
            currentGrid[i][j] !== solutionGrid[i][j]
          ) {
            incorrectCells.push({ row: i, col: j });
          }
        }
      }
  
      res.json({ incorrectCells });
    } catch (err) {
      console.error("Error in checkProgress:", err);
      res.status(500).send("Error checking progress.");
    }
  };
  
  module.exports = {
    undoUntilCorrect,
    checkProgress
  };
  