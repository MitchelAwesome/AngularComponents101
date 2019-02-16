import { Component, OnInit, Input, OnDestroy, OnChanges, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { TimerService } from './timer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-timer-native',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  providers: [TimerService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Native
})
export class TimerNativeComponent implements OnInit, OnDestroy {

  @Output() onDecrease = new EventEmitter<number>();
  @Output() onComplete = new EventEmitter<void>();

  @Input() init = 0;

  private counterCompletedSubscription: Subscription = null;
  private counterSubscription: Subscription = null;
  public counter = 0;


  get progressPercentage() {
    console.log('calculated');
    return (this.init - (this.counter)) / this.init * 100;
  }

  constructor(
    public timer: TimerService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.timer.restartCountdown(this.init);
    this.counterCompletedSubscription = this.timer.counterCompleted.subscribe(() => {
      // something
      console.log('--- end from component ---');
      this.onComplete.emit();
    });

    this.counterSubscription = this.timer.counter.subscribe((data) => {
      this.counter = data;
      this.cdRef.markForCheck();
    });
  }

  ngOnDestroy() {
    this.timer.destroy();
    this.counterCompletedSubscription.unsubscribe();
    this.counterSubscription.unsubscribe();
  }

}
