let runningResult = 0;
let userInput = "0";
let pressedOperator = null;
const result = document.querySelector('.calc-result-row');

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleOperator(value);
    } else {
        handleNumber(value);
    }
    updateUserInput();
}

function handleNumber(value) {
    if (userInput === "0") {
        userInput = value;
    } else {
        userInput += value;
    }
}

function handleOperator(value) {
    switch (value) {
        case "C":
            userInput = "0";
            runningResult = 0;
            break;
        case "=":
            if (pressedOperator === null) {
                return;
            }
            flushOperation(parseInt(userInput));
            pressedOperator = null;
            userInput = "" + runningResult;
            runningResult = 0;
            break;
        case "←":
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

function updateUserInput() {
    result.innerText = userInput;
}

function init() {
    document.querySelector('.calc-button-wrapper').addEventListener("click", function(event) {
        buttonClick(event.target.innerText);
    })
}

init();
