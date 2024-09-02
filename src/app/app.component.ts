import { Component, computed, Signal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-app-v18';
  private count = signal(0)

  ngOnInit() {
    // let count = 0
    // const doubleCount: Signal<number> = computed(()=> this.count() * 2)
    // while (count < 10){
    //   this.count.update( value => value + 1)
    //   console.log('The count is: ' + this.count())
    //   console.log('Double count:' + doubleCount())
    //   count++
    // }
    // this.count.set(150)
    // console.log(this.count())
    // console.log('Double count:' + doubleCount())

    const showCount = signal(false)
    const otherCount = signal(0)
    const conditionalCount = computed(()=> {
      if(showCount()){
        return `The count is ${otherCount()}`
      }else {
        return `Nothing to see here`
      }
    })
    console.log(conditionalCount())
    otherCount.set(15)
    console.log(conditionalCount())
    showCount.set(true)
    console.log(conditionalCount())

    

    
  }

}
