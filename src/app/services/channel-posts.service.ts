import { Injectable } from '@angular/core';
import { ChannelsService } from './channels.service';

@Injectable({
  providedIn: 'root'
})
export class ChannelPostsService {

  activeChannelIndex: number;

  constructor(private channelsService: ChannelsService) { }

  getPostTitles(index: number): string[] {
    let channelPostTitles: string[] = [];
    this.activeChannelIndex = index;

    this.channelsService.getChannelDataById(index).subscribe(channelData => {
      for (let i = 0; i < channelData.items.length; i++) {
        channelPostTitles.push(channelData.items[i].title);
        //added next code to emulate more than 10 items, because https://rss2json.com/ service doesn't allow
        //to load more than 10 items at once
        if (index === 2) {
          channelPostTitles.push(channelData.items[i].title);
        }
      }
    });

    return channelPostTitles;
  }
}
