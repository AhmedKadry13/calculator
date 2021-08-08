//calculator with no operator precedence for instant result
let currentOperationHolder = [];

let numbers = [];
let operations = [];

let enteringNewOperand = true;
let firstOperand = true;

let startNew = true;

//get elements from the page
const currentoperation = document.getElementById("current-operation");
const history = document.getElementById("history");
const resultP = document.getElementById("result");
const inputField1 = document.getElementById("input");

const clearOperandBtn = document.getElementById("clear-operand");
clearOperandBtn.addEventListener("click", clearOperand);

const clearAllBtn = document.getElementById("clear-all");
clearAllBtn.addEventListener("click", clearOperation);

//clear history
document.getElementById("clear-history").addEventListener("click", clearHistory);

//get operations butons from the app
const addBtn = document.getElementById("add");
addBtn.addEventListener("click", add);
document.getElementById("subtract").addEventListener("click", subtract);
document.getElementById("multiply").addEventListener("click", multiply);
document.getElementById("divide").addEventListener("click", divide);
document.getElementById("reminder").addEventListener("click", reminder);
document.getElementById("equal").addEventListener("click", equal);

const dotBtn = document.getElementById("dot");
dotBtn.addEventListener("click", () => {
    if(inputField1.value == ""){
        inputField1.value = "0."
        enteringNewOperand = false;
    }
    
    if(enteringNewOperand){
        inputField1.value += ".";
        enteringNewOperand = false;
    } 
})

//prevent text input
inputField1.addEventListener("keydown", () => {

});

//operations from buttons and keyboard
//add - pressing + from page or from numpad
function add(){
    //check for empty input
    let op1 = inputField1.value;
    let operator = "+";

    if(op1 == null || op1 == NaN || op1 == undefined || op1 == ""){
        return ;
    }

    //pushing operand to numbers
    numbers.push(op1);
    pushOrProcess(operator)
    
    //changing current operation <p>
    currentoperation.textContent += op1 + " + ";
    inputField1.value = null;
    enteringNewOperand = true;

    if(startNew){
        currentOperationHolder.push("<span>");
        startNew = false;
    }
    
    currentOperationHolder.push(op1);
    currentOperationHolder.push("+");
}

//subtract
function subtract(){
    //check for empty input
    let op1 = inputField1.value;
    let operator = "-";

    if(op1 == null || op1 == NaN || op1 == undefined || op1 == ""){
        return ;
    }

    //pushing operand to numbers
    numbers.push(op1);
    pushOrProcess("+");
    numbers.push("-1");
    pushOrProcess("*")
    
    //changing current operation <p>
    currentoperation.textContent += op1 + " - ";
    inputField1.value = null;
    enteringNewOperand = true;

    if(startNew){
        currentOperationHolder.push("<span>");
        startNew = false;
    }
    
    currentOperationHolder.push(op1);
    currentOperationHolder.push("-");
}

//multiply
function multiply() {
    //check for empty input
    let op1 = inputField1.value;
    let operator = "*";
 
    if(op1 == null || op1 == NaN || op1 == undefined || op1 == ""){
        return ;
    }
 
     //pushing operand to numbers
     numbers.push(op1);
     pushOrProcess(operator);
     
     //changing current operation <p>
     currentoperation.textContent += op1 + " * ";
     inputField1.value = null;
     enteringNewOperand = true;
 
     if(startNew){
         currentOperationHolder.push("<span>");
         startNew = false;
     }
     
     currentOperationHolder.push(op1);
     currentOperationHolder.push("*");
}

//divide
function divide() {
    let op1 = inputField1.value;
    let operator = "/";
 
    if(op1 == null || op1 == NaN || op1 == undefined || op1 == ""){
        return ;
    }
 
     //pushing operand to numbers
     numbers.push(op1);
     pushOrProcess(operator);
     
     //changing current operation <p>
     currentoperation.textContent += op1 + " \u00F7 ";
     inputField1.value = null;
     enteringNewOperand = true;
 
     if(startNew){
         currentOperationHolder.push("<span>");
         startNew = false;
     }
     
     currentOperationHolder.push(op1);
     currentOperationHolder.push("\u00F7");
}

//reminder
function reminder() {
    let op1 = inputField1.value;
    let operator = "%";
 
    if(op1 == null || op1 == NaN || op1 == undefined || op1 == ""){
        return ;
    }
 
     //pushing operand to numbers
     numbers.push(op1);
     pushOrProcess(operator);
     
     //changing current operation <p>
     currentoperation.textContent += op1 + " % ";
     inputField1.value = null;
     enteringNewOperand = true;
 
     if(startNew){
         currentOperationHolder.push("<span>");
         startNew = false;
     }
     
     currentOperationHolder.push(op1);
     currentOperationHolder.push("%");
}

//equal - get the result (pressing equal) and append new operation to history 
function equal() {

    let op1 = inputField1.value;
    if(op1 == null || op1 == ""){
        return
    }

    numbers.push(op1)

    while (!(operations.length == 0)) {
        numbers.push(performOperation(numbers, operations));
    }

    let finalResult = numbers.pop();
    currentOperationHolder.push(op1);
    currentOperationHolder.push("=");
    currentOperationHolder.push(finalResult);
    currentOperationHolder.push("</span>")
    currentOperationHolder.push("<br>");
    history.innerHTML += currentOperationHolder.join(" ");
    currentOperationHolder = [];

    //clear input field
    inputField1.value = null;
    enteringNewOperand = false;
    resultP.innerText = finalResult;
    firstOperand = true;

    //clear current operation
    currentoperation.innerText = null;

}

//clear current operation from view
function clearOperation(){
    inputField1.value = null;
    enteringNewOperand = false;
    firstOperand = true;

    //clear current operation
    currentoperation.innerText = null;
    resultP.innerText = 0;

    numbers = [];
    operations = [];
}

//clear clear operand
function clearOperand(){
    inputField1.value = null;
    enteringNewOperand = false;
}

//determing the precedence of the operators
function precedence(key){
    switch (key) {
        case "+" : 
        case "-" :
            return 1;
        case "*" :
        case "/":
        case "%" :
            return 2;
        default:
            return -1;
    }
}

//determine to push or do process 
function pushOrProcess(operator){
    //adding first operator
    if(operations.length == 0){
        operations.push(operator);
    }
    else if (precedence(operator) >= precedence(peek(operations))) {
        operations.push(operator);  
    }
    //doing the process then checking the peek to process again or push the 
    // operator in the operators stack
    else if(precedence(operator) < precedence(peek(operations))){
        numbers.push(performOperation(numbers, operations));
        while(true){  
            if(precedence(operator) < precedence(peek(operations))){
                numbers.push(performOperation(numbers, operations));
            }
            //continue to the main loop to continue evaluate the expression
            else if(precedence(operator) >= precedence(peek(operations))){
                operations.push(operator);
                break;
            }
        }
    }
}

//the process implemetation
function performOperation(numbers, operations){
    let operand2 = Number(numbers.pop());
    let operand1 = Number(numbers.pop());
    let operation = operations.pop();

    let resultFinal = 0

    switch (operation) {
        case "+":
            resultFinal = operand1 + operand2;
            break;
        case "-":
            resultFinal = operand1 - operand2;
            break;
        case "*":
            resultFinal = operand1 * operand2;
            break;
        case "/":
            try {
                resultFinal = operand1 / operand2;
            } catch (error) {
                break;
            }
            break;
        case "%":
            resultFinal = operand1 % operand2;
            break;  
        default:
            break;
    }
    return resultFinal;
}

function peek(stack) {
    return stack[stack.length -1];
}

//clear operations history
function clearHistory(){
    history.innerHTML = "Operations History :<br>";
}