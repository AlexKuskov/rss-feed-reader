import { Injectable } from '@angular/core';
import { ChannelsService } from './channels.service';
import { ChannelPostData } from '../models/ChannelPostData';

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
      const postContentItems: ChannelPostData[] = channelData.items;
      postContentItems.forEach(item => channelPostTitles.push(item.title));

      //added next code to emulate more than 10 items, because https://rss2json.com/ service doesn't allow
      //to load more than 10 items at once
      if (index === 2) {
        channelPostTitles.push(postContentItems[index].title);
      }
    });

    return channelPostTitles;
  }
}
