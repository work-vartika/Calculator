var userInput = document.getElementById('input')

let operand = "";
let expression = '';
let operators = ['+', '-', '*', '/'];
let infix = [];

class Stack {
    constructor() {
        this.items = [];
    }
    push(elem) {
        this.items.push(elem);
    }
    pop() {
        if (this.items.length == 0) {
            return;
        }
        return this.items.pop();
    }
    peek() {
        return this.items[this.items.length - 1]
    }
    isEmpty() {
        return this.items.length == 0;
    }
    reverse() {
        this.items.reverse();
    }

}


function appendInput(e) {
    if (expression.slice(-1) == '.' && e == '.') {
        return;
    }
    expression += e;
    operand += e;
    userInput.innerText = expression;
    // console.log(operand + "<--" + "operand")

}

let number = '';
function appendOperator(op) {
    if (expression.length == 0 && operators.includes(op)) {
        return;
    }
    else if (operators.includes(expression.slice(-1))) {
        return;
    }
    else {
      
        expression += op;
        number = operand;
        infix.push(number);
        userInput.innerText += op
        operand = '';
        number = '';
        infix.push(op);
    }

}

function cleared() {
    console.log("input cleared")
    expression = "";
    operand = ''
    userInput.innerText = expression;
    operatorsStack = []
    postfix = []
}

function calculate() {

    console.log(expression);
    number = operand;
    infix.push(number);
    console.log(infix)

    if (expression.length === 0) {
        alert("invalid expression!")
    }

// Prefix -->> Postfix 

    let operatorsStack = new Stack();
    let postfix = [];

    for (let i = 0; i < infix.length; i++) {
        if (operators.includes(infix[i])) {
            while (!operatorsStack.isEmpty() && precedence(infix[i]) <= precedence(operatorsStack.peek())) {
                postfix.push(operatorsStack.pop())
            }
            operatorsStack.push(infix[i])
        } else {
            postfix.push(infix[i])
        }
    }
    while (operatorsStack.items.length > 0) {
        postfix.push(operatorsStack.pop())
    }
    console.log(postfix, "postfix");

    // For postfix evaluastion 

    let newStack = new Stack();

    for (let i = 0; i < postfix.length; i++) {
        let item = postfix[i];
        console.log(item);
        if (operators.includes(item)) {
            let num1 = newStack.pop()
            let num2 = newStack.pop()

            switch (item) {
                case '+':
                    newStack.push(Number(num1) + Number(num2));
                    console.log(Number(num1) + Number(num2))
                    break;
                case '-':
                    newStack.push(Number(num2) - Number(num1));
                    console.log(Number(num2) - Number(num1))
                    break;
                case '*':
                    newStack.push(Number(num1) * Number(num2));
                    console.log(Number(num1) * Number(num2))
                    break;
                case '/':
                    newStack.push(Number(num2) / Number(num1));
                    console.log(Number(num1) / Number(num2))
                    break;
            }
            console.log(newStack)
            userInput.innerText = newStack.peek();

        } else {
            newStack.push(item);
        }
    }

}
function precedence(op) {
    if (op == '*' || op == "/") {
        return 2;
    } else if (op == "+" || op == "-") {
        return 1;
    }
    return -1;
}