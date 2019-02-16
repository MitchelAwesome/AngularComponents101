import { Component, OnInit, Input, OnDestroy, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy, OnChanges {

  @Output() onDecrease = new EventEmitter<number>();
  @Output() onComplete = new EventEmitter<void>();

  @Input() init: number = null;
  counter = 0;
  paused = true;

  private countdownTimerRef: any = null;

  constructor() { }

  ngOnInit() {
    if (this.init && this.init > 0) {
      this.counter = this.init;
    }
  }

  ngOnDestroy(): void {
    this.clearTimeout();
  }

  ngOnChanges(changes): void {
    console.log(`-- init value changed to ${changes.init.currentValue}`);
    this.restartCountdown();
  }

  restartCountdown() {
    if (this.init && this.init > 0) {
      this.paused = true;
      this.clearTimeout();
      this.counter = this.init;
    }
  }

  toggleCountdown() {
    this.paused = !this.paused;
    if (this.paused === false) {
      this.doCountdown();
    } else {
      this.clearTimeout();
    }
  }

  doCountdown() {
    this.countdownTimerRef = setTimeout(() => {
      this.counter = this.counter - 1;
      this.processCountdown();
    }, 1000);
  }

  private clearTimeout() {
    console.log('*** Clear timeout INIT ***');
    if (this.countdownTimerRef) {
      clearTimeout(this.countdownTimerRef);
      this.countdownTimerRef = null;
      console.log('*** Clear timeout called ***');
    }
  }

  processCountdown() {
    this.onDecrease.emit(this.counter);
    console.log('the current count is ', this.counter);

    if (this.counter === 0) {
      this.onComplete.emit();
      console.log('-- counter end --');
    } else {
      this.doCountdown();
    }
  }
}
