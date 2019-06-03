import { Injectable } from '@angular/core';
import { ChannelsService } from './channels.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  channelPostsNumber: number = 0;

  constructor(private channelsService: ChannelsService) { }

  getChannelsNumber() {
    return this.channelsService.channelList.length;
  }

  getChannelPostsNumber() {
    return this.channelsService.getChannelDataById(0);
  }

  getChannelAuthoursNumber() {
    return this.channelsService.getChannelDataById(0);
  }
}
