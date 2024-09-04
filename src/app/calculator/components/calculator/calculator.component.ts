import { Component, viewChildren  } from '@angular/core';
import { CalculatorButtonComponent } from "../calculator-button/calculator-button.component";

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  host: {
    '(document:keyup)': 'handleKeyBoardEvent($event)'
  }
})
export class CalculatorComponent {
  
  public calculatorButtons = viewChildren(CalculatorButtonComponent)

  
  handleClick(key: string) {
    console.log({key})
  }

  handleKeyBoardEvent(event: KeyboardEvent){
    const keyEquivalents: Record<string, string> = {
      Escape: 'C',
      Clear: 'C',
      '*': 'x',
      '/': '÷',
      Enter : '=',
    }

    const key = event.key
    const keyValue = keyEquivalents[key] ?? key
    this.handleClick(keyValue)
    this.calculatorButtons().forEach((button)=> {
      button.keyboardPressedStyle(keyValue)
    })
  }


}
