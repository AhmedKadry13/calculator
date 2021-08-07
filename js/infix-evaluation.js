// infix algorithm 
function evaluate(exp){
    //getting copy of the expression then,
    //removing minus from the expression 
    let ex = removeMinus(exp.slice());

    let numbers = [];
    let operations = [];

    mainLoop:
    for(let item of ex){
        //check for operand
        if (!isOperator(item)){
            numbers.push(item)
        }
        else {
            //adding first operator
            if(operations.length == 0 && isOperator(item)){
                operations.push(item);
            }
            else if (precedence(item) >= precedence(peek(operations))) {
                operations.push(item);  
            }
            //doing the process then checking the peek to process again or push the 
            // operator in the operators stack
            else if(precedence(item) < precedence(peek(operations))){
                numbers.push(performOperation(numbers, operations));

                innerLoop:
                while(true){  
                    if(precedence(item) < precedence(peek(operations))){
                        numbers.push(performOperation(numbers, operations));
                    }
                    //continue to the main loop to continue evaluate the expression
                    else if(precedence(item) >= precedence(peek(operations))){
                        operations.push(item);
                        continue mainLoop;
                    }
                }
            }
        }
    }

    //processing the stacks until there is no more operations
    while (!(operations.length == 0)) {
        numbers.push(performOperation(numbers, operations));
    }
    
    //returning the final result
    let result = peek(numbers);
    console.log(`final result = ${result}`);
    return numbers.pop();
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

//check for operators
function isOperator(item) {
    return item == "+" || item == "-" || item == "*" || item == "/" || item == "%"
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

//removing the minus from the expression
function removeMinus(exp) {
    let result = exp.slice();
    if(!result.includes("-")){
        return exp;
    }
    for(let i = 0 ; i< result.length ; i++){
        if(result[i] == "-"){
            result.splice(i, 1, "+", "-1", "*");
        }
    }
    return result;
}

export { evaluate as default };
