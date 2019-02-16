import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class TimerService {
    paused = true;
    private countdownTimerRef: any = null;
    private init = 0;
    private counterCompletedSource = new Subject<void>();
    public counterCompleted = this.counterCompletedSource.asObservable();
    private counterSource = new BehaviorSubject<number>(0);
    public counter = this.counterSource.asObservable();

    constructor() {}

    destroy(): void {
        this.clearTimeout();
    }

    restartCountdown(init?) {
        if (init) {
            this.init = init;
        }

        if (this.init && this.init > 0) {
            this.paused = true;
            this.clearTimeout();
            this.counterSource.next(init);
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
            this.counterSource.next(this.counterSource.getValue() - 1);
            this.processCountdown();
        }, 1000);
    }

    private clearTimeout() {
        if (this.countdownTimerRef) {
            clearTimeout(this.countdownTimerRef);
            this.countdownTimerRef = null;
            console.log('*** Clear timeout called ***');
        }
    }

    processCountdown(): void {
        if (this.counterSource.getValue() <= 0) {
            this.counterCompletedSource.next();
        } else {
            this.doCountdown();
        }
    }
}
