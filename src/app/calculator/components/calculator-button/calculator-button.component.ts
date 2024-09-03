import { Component, HostBinding, input } from '@angular/core';

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

  @HostBinding('class.w-2/4') 
  public get isEqualStyle() {
    return this.isEqual()
  }
  
}
