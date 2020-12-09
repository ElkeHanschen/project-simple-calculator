// running total of calculation
let runningResult = 0;
// keep track of what user types in
let userInput = "0";
// keep track of the last operator the user pressed
let pressedOperator = null;
// grab class and (use var for) updating
const result = document.querySelector('.calc-result-row');

// generally we wanna do two things: if it's a number do this - if it's an operator do that
// first clarify: is value a number or not
function buttonClick(value) {
    // parseInt converts string to integer
    if (isNaN(parseInt(value))) {
        handleOperator(value);
    } else {
        handleNumber(value);
    }
    // is used to update any time something changed
    updateUserInput();
}

function handleNumber(value) {
    if (userInput === "0") {
        userInput = value;
    } else {
        // in result-row, append (at the end) clicked number to already clicked number
        userInput += value;
    }
}

// you could also do a bunch of if/else statements here
function handleOperator(value) {
    // switch different code blocks based on value
    switch (value) {
        case "C":
            userInput = "0";
            runningResult = 0;
            pressedOperator = null;
            break;
        case "=":
            if (pressedOperator === null) {
                return;
            }
            // turn userInput into a number and pass it into flushOperation
            flushOperation(parseInt(userInput));
            pressedOperator = null;
            // quotes are doing string concat here
            userInput = "" + runningResult;
            runningResult = 0;
            break;
        case "←":
            // keeps the 0 a 0 even if double clicked
            if (userInput.length === 1) {
                userInput = "0";
            } else {
                userInput = userInput.substring(0, userInput.length - 1);
            }
            break;
        default:
            handleMath(value);
            break;
    }
}

function handleMath(value) {
    const intUserInput = parseInt(userInput);
    if (runningResult === 0) {
        runningResult = intUserInput;
    } else {
        flushOperation(intUserInput);
    }
    pressedOperator = value;
    userInput = "0";
}

function flushOperation(intUserInput) {
    if (pressedOperator === "+") {
        runningResult += intUserInput;
    } else if (pressedOperator === "-") {
        runningResult -= intUserInput;
    } else if (pressedOperator === "×") {
        runningResult *= intUserInput;
    } else {
        runningResult /= intUserInput;
    }
}

// is used to update any time something changed
function updateUserInput() {
    result.innerText = userInput;
}

function init() {
    // binding of evenListener (on calc-container level)
    document.querySelector('.calc-button-wrapper').addEventListener("click", function(event) {
        buttonClick(event.target.innerText);
    })
}

init();
