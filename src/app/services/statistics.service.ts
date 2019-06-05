import { Injectable } from '@angular/core';
import { ChannelsService } from './channels.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  channelPostsNumber: number = 0;
  private channelIdxSubject = new Subject<any>();
  private twoIdxSubject = new Subject<any>();

  constructor(private channelsService: ChannelsService) { }

  getChannelsNumber() {
    return this.channelsService.channelList.length;
  }

  setChannelIndex(channelIdx: number) {
    this.channelIdxSubject.next(channelIdx);
  }

  getChannelIndex() {
    return this.channelIdxSubject.asObservable();
  }

  setChannelPostIndeces(channelIdx: number, postIdx: number) {
    this.twoIdxSubject.next([channelIdx, postIdx]);
  }

  getChannelPostIndeces() {
    return this.twoIdxSubject.asObservable();
  }
}
