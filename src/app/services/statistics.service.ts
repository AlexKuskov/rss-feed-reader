import { Injectable } from '@angular/core';
import { ChannelsService } from './channels.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  channelPostsNumber: number = 0;
  private subject = new Subject<any>();

  constructor(private channelsService: ChannelsService) { }

  getChannelsNumber() {
    return this.channelsService.channelList.length;
  }

  setChannelIndex(channelIdx: number) {
    this.subject.next(channelIdx);
  }

  getChannelIndex() {
    return this.subject.asObservable();
  }
}
