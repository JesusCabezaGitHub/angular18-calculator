import { Component, ElementRef, HostBinding, input, output, viewChild } from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  imports: [],
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.css',
  host: {
    class: "w-1/4 border-r border-b border-indigo-400"    
  }
})
export class CalculatorButtonComponent {
  public isCommand = input<boolean>(false)
  public isEqual = input<boolean>(false)
  public onClick = output<string>()

  contentValue = viewChild<ElementRef<HTMLButtonElement>>('btnCalculator')

  @HostBinding('class.w-2/4') 
  public get isEqualStyle() {
    return this.isEqual()
  }

  handleClick(){
    const contentValue = this.contentValue()?.nativeElement.innerText
    if(contentValue){
      this.onClick.emit(contentValue.trim())
    }    
  }
  
}
