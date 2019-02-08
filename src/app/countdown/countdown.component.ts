import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {

  @Output() onDecrease = new EventEmitter<number>();
  @Output() onComplete = new EventEmitter<void>();
  @Input() init:number = null;
  counter:number = 0;
  private countdownTimerRef:any = null;
  constructor() { }

  ngOnInit() {
    this.startCountdown();
  }

  startCountdown() {
    if(this.init && this.init > 0) {
      this.clearTimeout();
      this.counter = this.init;
      this.doCountdown();
    }
  }

  doCountdown() {
    this.countdownTimerRef = setTimeout(()=>{
      this.counter = this.counter - 1;
      this.processCountdown()
    }, 1000)
  }

  private clearTimeout() {
    console.log('*** Clear timeout INIT ***');
    if(this.countdownTimerRef) {
      clearTimeout(this.countdownTimerRef);
      this.countdownTimerRef = null;
      console.log('*** Clear timeout called ***');
    }
  }

  processCountdown() {
    this.onDecrease.emit(this.counter);
    console.log('the current count is ', this.counter);

    if(this.counter == 0) {
      this.onComplete.emit();
      console.log("-- counter end --");
    } else {
      this.doCountdown();
    }
  }

}
