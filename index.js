var userInput = document.getElementById('input')

let operand = "";
let expression = '';
let operators = ['+', '-', '*', '/'];

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

let infix = new Stack();

function appendInput(e) {
    if(expression.slice(-1)=='.' && e=='.'){
        return;
    }
    expression += e;
    operand += e;
    userInput.innerText = expression;
    // console.log(operand + "<--" + "operand")

}

let number = '';
function appendOperator(op) {
    if(expression.length==0 && operators.includes(op)){
        return;
    }
    else if (operators.includes(expression.slice(-1))) {
        return;
    }
    else {
        // console.log(expression.slice(-1))
        // console.log(op)
        expression += op;
        // console.log(expression)
        number = operand;
        // console.log(operand);
        // console.log(number)
        infix.push(number);
        // console.log(infix);
        userInput.innerText += op
        operand = '';
        number = '';
        infix.push(op);
        // console.log(infix)
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
    console.log(infix.items.reverse(),"Infix")

    if (expression.length === 0) {
        alert("invalid expression!")
    }

    let operatorsStack = new Stack();
    let postfix = new Stack();

    console.log(infix.items.length);

    while (infix.items.length != 0) {
        // console.log(infix.peek())
        let currentNum = infix.peek();
        // console.log(currentNum)
        if (operators.includes(currentNum)) {
            // console.log("operator");
            // console.log(operatorsStack.isEmpty())
            if (operatorsStack.isEmpty()) {
                // console.log(infix.peek())
                operatorsStack.push(infix.peek());
                // console.log(operatorsStack.items.length);
                // console.log(operatorsStack);
            } else if (precedence(currentNum) == precedence(operatorsStack.peek()) || precedence(currentNum) > precedence(operatorsStack.peek())) {

                // console.log( operatorsStack.pop())
                postfix.push(operatorsStack.pop());
                operatorsStack.push(currentNum);
                // console.log(operatorsStack)
            }

        } else {
            postfix.push(currentNum);
        }

        // console.log(operatorsStack.items.length)
        // console.log(operatorsStack);

        infix.pop();
    }

    while (operatorsStack.items.length > 0) {
        postfix.push( operatorsStack.pop());
       
    }

    console.log(infix)
    console.log(postfix);


    // For postfix evaluastion 

    postfix.reverse();
    console.log(postfix)
    let newStack = new Stack();

    while (postfix.items.length > 0) {
        let item = postfix.pop()
        console.log(item)
        if (operators.includes(item)) {
            console.log(item)
            let num1 = newStack.pop();
            let num2 = newStack.pop();

            switch (item) {
                case '+':
                    newStack.push(Number(num1) + Number(num2))
                    console.log(Number(num1) + Number(num2));
                    break;
                case '-':
                    newStack.push(-Number(num1) + Number(num2))
                    console.log(-Number(num1) + Number(num2));
                    break;
                case '*':
                    newStack.push(Number(num1) * Number(num2))
                    console.log(Number(num1) * Number(num2));
                    break;
                case '/':
                    newStack.push(Number(num1) / Number(num2))
                    console.log(Number(num1) / Number(num2));
                    break;

            }
            console.log(newStack)
            userInput.innerText = newStack.peek();

        } else {
            console.log(item)
            newStack.push(item);
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









    // for(let i=0;i<infix.items.length;i++){
    //     console.log(i)
    //     console.log(infix.peek());
    //     // console.log(infix.pop())
    //     infix.pop();
    // }


    // console.log(infix)


    // for(let i=0;i<infix.items.length;i++){
    //     console.log(infix.items[i]);
    //     console.log(infix.peek())
    //     if(operators.includes(infix.items[i])){

    //         // postfix.push(infix.items[i])
    //         console.log(operatorsStack.isEmpty())

    //         // console.log(operatorsStack)
    //         console.log(infix.peek())
    //         // console.log(precedence(operatorsStack.peek())==precedence(infix.items[i] ))
    //         if(operatorsStack.isEmpty()){
    //             console.log(operatorsStack.isEmpty())
    //             operatorsStack.push(infix.peek());
    //             console.log(operatorsStack.isEmpty())
    //             console.log(operatorsStack);
    //         }else{
    //             if(precedence(operatorsStack.peek())==precedence(infix.items[i] ) || precedence(operatorsStack.peek())>precedence(infix.items[i])){
    //                 console.log(operatorsStack)
    //                 console.log(operatorsStack.pop())
    //                 postfix.push(infix.items[i]);
    //             }
    //         }
    //     }else{
    //         postfix.push(infix.items[i])
    //     }

    // }



    //  console.log("postfix -->",postfix)


    // let num;
    // let postfix=new Stack();


    // for(let i=0;i<expression.length;i++){

    //     if(operatorsStack.length!=0 && operators.includes(expression[i])){

    //         if(precedence(operatorsStack.peek()) == precedence(expression[i]) || precedence(operatorsStack.peek())>precedence(expression[i])){
    //         console.log(operatorsStack.pop())
    //         postfix.push(operatorsStack.pop());
    //         console.log(operatorsStack)

    //     }

    //     }else{
    //         num+=expression[i];
    //     }

    // }

}


// function calculation(num1,num2,op){
//     switch(op){
//         case '+':
//             return Number(num1)+Number(num2);
//         case '-':
//             return Number(num1)-Number(num2);
//         case '*':
//             return Number(num1)*Number(num2);
//         case '/':
//             return Number(num1)/Number(num2);
//         default:
//             console.log("nothing here")
//     }
// }