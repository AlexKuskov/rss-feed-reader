import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private channelIdxTransmitter$: Subject<number> = new Subject<number>();
  private twoIdxTransmitter$: Subject<Array<number>> = new Subject<Array<number>>();

  constructor() { }

  setChannelIndex(channelIdx: number): void {
    this.channelIdxTransmitter$.next(channelIdx);
  }

  getChannelIndex(): Observable<number> {
    return this.channelIdxTransmitter$.asObservable();
  }

  setChannelPostIndeces(channelIdx: number, postIdx: number): void {
    this.twoIdxTransmitter$.next([channelIdx, postIdx]);
  }

  getChannelPostIndeces(): Observable<Array<number>> {
    return this.twoIdxTransmitter$.asObservable();
  }
}
