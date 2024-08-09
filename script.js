/**
 * Calculator{} defines a new class called ‘Calculator’. 
 * A class in JavaScript is a blueprint for creating objects with pre- defined properties and methods
 */
class Calculator {
    constructor(PREVIOUS, CURRENT) {
        this.PREVIOUS = PREVIOUS
        this.CURRENT = CURRENT
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
        this.updateDisplay()
    }

    delete() {
        /**
         *  Converts currentOperand to a string and removes the last character.
         */
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
        this.updateDisplay()
    }

    appendNum(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
        this.updateDisplay()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
        this.updateDisplay()
    }


    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = adding(prev + current)
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
        this.updateDisplay()
    }

    updateDisplay() {
        /**
         *  Sets the inner text of the CURRENT display element to currentOperand.s
         */
        this.CURRENT.innerText = this.currentOperand
        this.PREVIOUS.innerText = this.previousOperand
    }
}

function adding(p1, p2) {
    return p1 + p2
}


/**
 *  Selects all elements with the number attribute and stores them in NUMBER_BUTTONS. This is a NodeList of button elements.
 * select all HTML elements that have a number attribute. Let's break down the components of this code and understand its meaning:
 * document: This represents the HTML document that is currently being viewed. 
 * It is the root of the HTML document and allows access to the entire DOM (Document Object Model).
 * querySelectorAll: This is a method of the document object. It returns a static (not live) NodeList of all elements that match the specified CSS selector(s).
 * A NodeList is a collection of nodes, which can be elements or other types of nodes.
 * '[number]': This is the CSS selector used to match elements. 
 * In this case, it selects all elements that have a number attribute, regardless of its value.
 */
const NUMBER_BUTTONS = document.querySelectorAll('[number]')
const OPERATION_BUTTONS = document.querySelectorAll('[operation]')
/**
 * Selects the first element with the delete attribute and stores it in DELETE.
 */
const OPERATION_EQUALS = document.querySelector('[equals]')
const DELETE = document.querySelector('[delete]')
const CLEAR = document.querySelector('[clear]')
const PREVIOUS = document.querySelector('[prev]')
const CURRENT = document.querySelector('[current]')

const cal = new Calculator(PREVIOUS, CURRENT)

/**
 * Adds an event listener to each button in NUMBER_BUTTONS.
 * When a button is clicked, the appendNum method is called with the button's inner text as the argument. 
 */
NUMBER_BUTTONS.forEach(button => {
    button.addEventListener('click', () => {
        cal.appendNum(button.innerText)
    })
})

OPERATION_BUTTONS.forEach(button => {
    button.addEventListener('click', () => {
        cal.chooseOperation(button.innerText)
    })
})

OPERATION_EQUALS.addEventListener('click', button => {
    cal.compute()
})

DELETE.addEventListener('click', button => {
    cal.delete()
})

CLEAR.addEventListener('click', button => {
    cal.clear()
})
