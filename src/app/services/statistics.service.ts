import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private channelIdx: Subject<number> = new Subject<number>();
  private twoIdx: Subject<Array<number>> = new Subject<Array<number>>();

  constructor() { }

  setChannelIndex(channelIdx: number): void {
    this.channelIdx.next(channelIdx);
  }

  getChannelIndex(): Observable<number> {
    return this.channelIdx.asObservable();
  }

  setChannelPostIndeces(channelIdx: number, postIdx: number): void {
    this.twoIdx.next([channelIdx, postIdx]);
  }

  getChannelPostIndeces(): Observable<Array<number>> {
    return this.twoIdx.asObservable();
  }
}
