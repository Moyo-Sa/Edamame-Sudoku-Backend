// This code was not used for the sudoku app

// Initialize two stacks as arrays
let firstStack = []; // History stack that needs fixing
let secondStack = []; // Temporary stack

// Function to fix the history stack
function fixHistoryStack(hintCellLocation) {
    console.log("Starting fixHistoryStack...");
    console.log("Initial First Stack:", JSON.stringify(firstStack));
    console.log("Hint Cell Location to Discard:", hintCellLocation);

    // Initialize the second stack
    secondStack = [];

    // Continue as long as there are elements in the first stack
    while (firstStack.length > 0) {
        // Pop element from the first stack
        let poppedElement = firstStack.pop();
        console.log("Popped Element from First Stack:", poppedElement);

        // Check if the location of the popped element equals the hint cell location
        if (poppedElement.location === hintCellLocation) {
            console.log(`Element with location ${hintCellLocation} discarded.`);
            // If they match, discard the element (do nothing)
            continue;
        } else {
            // If they don't match, add the element to the second stack
            console.log("Pushing Element to Second Stack:", poppedElement);
            secondStack.push(poppedElement);
        }
    }

    console.log("Second Stack after transfer:", JSON.stringify(secondStack));

    // Move all elements from the second stack back to the first stack
    while (secondStack.length > 0) {
        // Pop from the second stack and push to the first stack
        let elementToRestore = secondStack.pop();
        firstStack.push(elementToRestore);
        console.log("Restoring Element to First Stack:", elementToRestore);
    }

    console.log("Final Fixed First Stack:", JSON.stringify(firstStack));
}

// Example usage
// Assuming each element in the stack has a 'location' property
firstStack = [
    { location: 1, value: 'A' },
    { location: 2, value: 'B' },
    { location: 3, value: 'C' },
    { location: 4, value: 'D' }
];

let hintCellLocation = 2; // Define the hint cell location you want to filter out

// Run the fixHistoryStack function to fix the stack
fixHistoryStack(hintCellLocation);

console.log("Fixed History Stack:", firstStack);
