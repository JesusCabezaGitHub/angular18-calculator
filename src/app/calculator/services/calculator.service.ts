import { Injectable, signal } from '@angular/core';

const numbers = ['0','1','2','3','4','5','6','7','8','9']
const operators = ['+','-','*','/', 'x', '÷']
const specialOperators = ['+/-','%','.','=','C', 'Backspace']

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  public resultText = signal('0')
  public subResultText = signal('0')
  public lastOperator = signal('')

  public buildNomber(key:string) {
    this.validateKey(key)
    if(this.resultText().length >10) {
      console.log('Maximo número de caracteres alcanzado')
      return
    }
    if (key === '=') {
      this.calculateResult()
      return
    }
    if (key === 'C') {
      this.resetValues()
      return
    }
    if (key === 'Backspace') {
      this.applyBackspace()
    }

    if (operators.includes(key)) {
      this.applyOperator(key)      
    }

    if (key === '.' && !this.resultText().includes('.')) {
      this.validateDecimalPoint()
    }    

    //Manejo del cero inicial
    if (key === '0' && (this.resultText() === '0' || this.resultText() === '-0')) {
      return
    }

    if (key === '+/-') {
      this.toogleSign()
    }

    //Números
    if(numbers.includes(key)) {
      this.applyNumber(key)
    }
  }

  private validateKey(key:string){
    if ( ![...numbers, ...operators, ...specialOperators].includes(key) ) {
      console.log('Invalid key')
      return
    }
  }
  
  private resetValues(){
    this.resultText.set('0')
    this.subResultText.set('0')
    this.lastOperator.set('')
  }

  private applyBackspace() {
    if (this.resultText() === '0') return
    if (this.resultText.length === 1) {
      this.resultText.set('0')
      return
    }
  
    this.resultText.update( (currentValue) => currentValue.slice(0, -1))
    return
  }

  private applyOperator(key: string) {
    if(this.subResultText() !== '0'){
      this.calculateResult()
    }
    this.lastOperator.set(key)
    this.subResultText.set(this.resultText())
    this.resultText.set('0')
  }

  private validateDecimalPoint() {
    if (this.resultText() === '0' || this.resultText() === '') {
      this.resultText.set('0.')
      return
    }
    this.resultText.update((currentValue) => currentValue + '.')
    return
  }
  
  private toogleSign() {
    if (this.resultText().includes('-')) {
      this.resultText.update( (currentValue) => currentValue.slice(1))
      return
    }
    this.resultText.update( (currentValue) => '-' + currentValue)
    return
  }

  private applyNumber(key:string) {
    if (this.resultText() === '0') {
      this.resultText.set(key)
      return
    }
    if (this.resultText() === '-0') {
      this.resultText.set('-' + key)
      return            
    }
    this.resultText.update( (currentValue) => currentValue + key )
    return
  }

  private calculateResult() {
    const number1 = parseFloat(this.subResultText())
    const number2 = parseFloat(this.resultText())
   
    let result = 0
    switch (this.lastOperator()) {
      case '+':
        result = number1 + number2
        break
      case '-':
        result = number1 - number2
        break
      case '*':
        result = number1 * number2
        break
      case 'x':
        result = number1 * number2
        break
      case '/':
        result = number1 / number2
        break  
      case '÷':
        result = number1 / number2
        break  
    }
    this.resultText.set(result.toString())
    this.subResultText.set('0')
  }

  
}
