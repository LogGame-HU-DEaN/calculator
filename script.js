class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  clear() {
    this.jelenlegi = ''
    this.elozo = ''
    this.muvelet = undefined
  }

  delete() {
    this.jelenlegi = this.jelenlegi.toString().slice(0, -1)
  }

  appendNumber(szam) {
    if (szam === '.' && this.jelenegi.includes('.')) return
    this.jelenlegi = this.jelenlegi.toString() + szam.toString()
  }

  chooseOperation(muvelet) {
    if (this.jelenlegi === '') return
    if (this.elozo !== '') {
      this.compute()
    }
    this.muvelet = muvelet
    this.elozo = this.jelenlegi
    this.jelenlegi = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.elozo)
    const current = parseFloat(this.jelenlegi)
    if(isNaN(prev)){
      switch (this.muvelet) {
        case '√':
          computation = Math.sqrt(current)
          break
        default:
          return
      }
    }
    if (isNaN(prev) || isNaN(current)) return
    switch (this.muvelet) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '×':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      case '%':
        computation = prev * (current / 100)
        break
      case '√':
        computation = Math.pow(current, 1/prev)
        break
      case "xx":
        computation = Math.pow(prev, current)
        break
      default:
        return
    }
    this.jelenlegi = computation
    this.muvelet = undefined
    this.elozo = ''
  }

  getDisplayNumber(szam) {
    const stringNumber = szam.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.jelenlegi)
    if (this.muvelet != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.elozo)} ${this.muvelet}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}


const numberButtons = document.querySelectorAll('[data-szam]')
const operationButtons = document.querySelectorAll('[data-muvelet]')
const equalsButton = document.querySelector('[data-egyenlo]')
const deleteButton = document.querySelector('[data-del]')
const allClearButton = document.querySelector('[data-ac]')
const previousOperandTextElement = document.querySelector('[data-elozo]')
const currentOperandTextElement = document.querySelector('[data-jelenlegi]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})

document.addEventListener('keydown', function (event) {
  let patternForNumbers = /[0-9]/g;
  let patternForOperators = /[+\-*\/]/g
  if (event.key.match(patternForNumbers)) {
    event.preventDefault();
    calculator.appendNumber(event.key)
    calculator.updateDisplay()
  }
  if (event.key === '.') {
    event.preventDefault();
    calculator.appendNumber(event.key)
    calculator.updateDisplay()
  }
  if (event.key.match(patternForOperators)) {
    event.preventDefault();
    calculator.chooseOperation(event.key)
    calculator.updateDisplay()
  }
  if (event.key === 'Enter' || event.key === '=') {
    event.preventDefault();
    calculator.compute()
    calculator.updateDisplay()
  }
  if (event.key === "Backspace") {
    event.preventDefault();
    calculator.delete()
    calculator.updateDisplay()
  }
  if (event.key == 'Delete') {
    event.preventDefault();
    calculator.clear()
    calculator.updateDisplay()
  }

});

function darkMode() {
  var element = document.body;
  element.className = "dark-mode";
}

function lightMode() {
  var element = document.body;
  element.className = "light-mode";
}

function pinkMode() {
  var element = document.body;
  element.className = "pink-mode";
}
