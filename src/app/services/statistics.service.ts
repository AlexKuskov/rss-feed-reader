import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private channelIndexTransmitter$: Subject<number> = new Subject<number>();
  private twoIndicesTransmitter$: Subject<Array<number>> = new Subject<Array<number>>();

  constructor() { }

  setChannelIndex(channelIndex: number): void {
    this.channelIndexTransmitter$.next(channelIndex);
  }

  getChannelIndex(): Observable<number> {
    return this.channelIndexTransmitter$.asObservable();
  }

  setChannelPostIndices(channelIndex: number, postIdx: number): void {
    this.twoIndicesTransmitter$.next([channelIndex, postIdx]);
  }

  getChannelPostIndices(): Observable<Array<number>> {
    return this.twoIndicesTransmitter$.asObservable();
  }
}
