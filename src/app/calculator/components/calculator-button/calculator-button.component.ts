import { Component, ElementRef, HostBinding, input, output, signal, viewChild } from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  imports: [],
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.css',
  host: {
    class: "border-r border-b border-indigo-400",
    '[class.w-2/4]': 'isEqual()',    
    '[class.w-1/4]': '!isEqual()'    
  }
})
export class CalculatorButtonComponent {
  public isCommand = input<boolean>(false)
  public isEqual = input<boolean>(false)
  public onClick = output<string>()

  public isPressed = signal(false)

  contentValue = viewChild<ElementRef<HTMLButtonElement>>('btnCalculator')

  // @HostBinding('class.w-2/4') 
  // public get isEqualStyle() {
  //   return this.isEqual()
  // }

  handleClick(){
    const contentValue = this.contentValue()?.nativeElement.innerText
    if(contentValue){
      this.onClick.emit(contentValue.trim())
    }    
  }

  public keyboardPressedStyle(key: string){
    if ( !this.contentValue() ) return

    const value = this.contentValue()!.nativeElement.innerText

    if ( value !== key) return

    this.isPressed.set(true)

    setTimeout(()=>{
      this.isPressed.set(false)
    }, 100)
  }
  
}
