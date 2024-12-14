// This code was not used for the sudoku app
function assignCorrectValueFromAnswerKey(board, answerKey, row, col) {
    const correctValue = answerKey[row][col];
    board[row][col] = correctValue;
    console.log(`Assigned Correct Value ${correctValue} to Cell (${row}, ${col})`);
}

function sudokuGameRandomHint(board, answerKey) {
    console.log("Starting Hint Generation...");
    
    // Find incorrect entries
    const incorrectEntries = [];
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] !== 0 && board[row][col] !== answerKey[row][col]) {
                incorrectEntries.push({ row, col });
            }
        }
    }

    if (incorrectEntries.length > 0) {
        // Correct a random incorrect cell
        const randomIncorrectCell = incorrectEntries[Math.floor(Math.random() * incorrectEntries.length)];
        console.log("Correcting Incorrect Cell:", randomIncorrectCell);
        assignCorrectValueFromAnswerKey(board, answerKey, randomIncorrectCell.row, randomIncorrectCell.col);
    } else {
        // If no incorrect entries, find unassigned cells
        const unassignedCells = [];
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    unassignedCells.push({ row, col });
                }
            }
        }

        if (unassignedCells.length > 0) {
            const randomUnassignedCell = unassignedCells[Math.floor(Math.random() * unassignedCells.length)];
            console.log("Assigning Correct Value to Unassigned Cell:", randomUnassignedCell);
            assignCorrectValueFromAnswerKey(board, answerKey, randomUnassignedCell.row, randomUnassignedCell.col);
        } else {
            console.log("The board is already complete and correct!");
        }
    }
}
