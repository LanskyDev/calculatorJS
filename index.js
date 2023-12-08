const numberButtons = $(".btn-num").toArray();
const operatorButtons = $(".btn-operator").toArray();
const displayText = $("#displayText");
const equalButton = $("#btnEqual");
const pointButton = $("#btnPoint").first();
const delButton = $("#btnDel").first();
const resetButton = $("#btnReset").first();

let num1 = "";
let num2 = "";
let operator = "";
let result = "";
let equalButtonPressed = false;



// Attach Event Handlers to the NUMBER Buttons
for (const numBtn of numberButtons) {

    const number = numBtn.dataset.value;

    $(numBtn).on("click", () => {
        handleNumberButtonClick(number);
    })
}


// Attach Event Handlers to the OPERATOR Buttons
for (const opBtn of operatorButtons) {

    const selectedOperator = opBtn.dataset.value;



    $(opBtn).on("click", () => {

        // Only allow operator selection if num1 is truthy;
        if (num1) {
            operator = selectedOperator;
            handleOperatorButtonClick(selectedOperator);
        } else {
            return;
        }
    })
}


// Attach event handler to the POINT button
$(pointButton).on("click", () => {

    const point = pointButton.data("value");

    if (equalButtonPressed) {
        resetCalculator();
    }

    // Add a point to num1 or num2 based on the state of the app (if there's an operator or not);
    if (!operator && !num1.includes(".")) {
        num1 += point;
    } else if (operator && !num2.includes(".")) {
        num2 += point;
    }

    display();
})


// Attach event handler to the EQUAL button
$(equalButton).on("click", () => {

    // Only calculate if num1, operator and num2 are truthy
    if (num1 && operator && num2) {
        calculate();
        console.log("calculating")
    } else {
        console.log("insert all the numbers")
        return;
    }

})


// Attach event handler to the DEL button
$(delButton).on("click", () => {

    if (!equalButtonPressed) {
        !operator
            ? num1 = num1.substring(0, num1.length - 1) // Remove the last digit
            : num2 = num2.substring(0, num2.length - 1);
    } else {
        return;
    }

    display();
})


// Attach event handler to the RESET button
$(resetButton).on("click", () => {
    resetCalculator();
})


function handleNumberButtonClick(number) {

    if (equalButtonPressed) {
        resetCalculator();
    }

    if (!operator) {
        num1 += number;
    } else if (operator) {
        num2 += number;  
    }

    equalButtonPressed = false;
    display();
}


function handleOperatorButtonClick(selectedOperator) {

    equalButtonPressed = false;
    operator = selectedOperator;

    display();
}


function calculate() {
    let calcString = num1 + operator + num2;
    result = eval(calcString);

    equalButtonPressed = true;
    display();

    num1 = result.toString();
    num2 = "";
    operator = "";
}


function display() {

    if (!num1) {
        displayText.text("0")
    } else {
        !equalButtonPressed
            ? displayText.text(`${num1} ${operator} ${num2}`)
            : displayText.text(result);
    }
}


function resetCalculator() {
    num1 = "";
    num2 = "";
    operator = "";
    result = "";
    equalButtonPressed = false;
    display();
}