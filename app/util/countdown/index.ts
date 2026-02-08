import { COUNTDOWN_TICK_INTERVAL_TIME } from '@/config';

export default class Countdown {
  private startTime: number;
  private endTime: number;
  private milliseconds: number;
  private interval: NodeJS.Timeout | undefined;
  public onEnd: () => void;
  public onTick: (remainingPercent: number) => void;

  constructor(milliseconds: number, onTick: (remainingPercent: number) => void, onEnd: () => void) {
    this.startTime = Date.now();
    this.endTime = this.startTime + milliseconds;
    this.milliseconds = milliseconds;
    this.onEnd = onEnd;
    this.onTick = onTick;
  }

  public start() {
    this.stop();
    this.interval = setInterval(() => {
      const remaining = this.endTime - Date.now();
      if (remaining <= 0) {
        this.stop();
        this.onEnd();
      } else {
        this.onTick(Number.parseInt(`${(remaining / this.milliseconds) * 100}`, 10));
      }
    }, COUNTDOWN_TICK_INTERVAL_TIME);
  }

  public restart() {
    this.startTime = Date.now();
    this.endTime = this.startTime + this.milliseconds;
    this.start();
  }

  public stop() {
    clearInterval(this.interval);
  }
}
