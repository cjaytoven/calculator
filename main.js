let operator = '';
let previousValue = '';
let currValue = '';

document.addEventListener("DOMContentLoaded", function(){
    let clear = document.querySelector(".clear");
    let equal = document.querySelector(".equal");
    let decimal = document.querySelector(".decimal");

    let numbers = document.querySelectorAll(".number");
    let operators = document.querySelectorAll(".operator");

    let previousScreen = document.querySelector(".previous");
    let currentScreen = document.querySelector(".current");

    numbers.forEach((number) => number.addEventListener("click", function(e){
        handleNumber(e.target.textContent);
        currentScreen.textContent = currValue;
    }))

    operators.forEach((op) => op.addEventListener("click", function(e){
        handleOperator(e.target.textContent);
        previousScreen.textContent = previousValue + " " + operator;
        currentScreen.textContent = currValue;
    }))

    clear.addEventListener("click", function(){
        previousValue = '';
        currValue = '';
        operator = '';
        previousScreen.textContent = '';
        currentScreen.textContent = '';
    })

    equal.addEventListener("click", function(){
        if (currValue != '' && previousValue != ''){
            calculate();
            previousScreen.textContent = '';
            if (previousValue.length <= 5){
                currentScreen.textContent = previousValue;
            }
            else {
                currentScreen.textContent = previousValue.slice(0,5) + "...";
            }

        }
    })

    decimal.addEventListener("click", function(){
        addDecimal();
    })
})

function handleNumber(num){
    if(currValue.length <= 5) currValue+= num;
}

function handleOperator(op){
    operator = op;
    previousValue = currValue;
    currValue = '';
}

function calculate(){
    previousValue = Number(previousValue);
    currValue = Number(currValue);

    if (operator === "+"){
        previousValue += currValue;
    } 
    else if (operator === "-"){
        previousValue -= currValue;
    }
    else if (operator === "x"){
        previousValue *= currValue;
    } else {
        previousValue /= currValue;
    }
    previousValue = roundNumber(previousValue);
    previousValue = previousValue.toString();
    currValue = previousValue.toString();
}

function roundNumber(num){
    return Math.round(num * 1000) / 1000;
}

function addDecimal(){
    if (!currValue.includes(".")){
        currValue += ".";
    }
}