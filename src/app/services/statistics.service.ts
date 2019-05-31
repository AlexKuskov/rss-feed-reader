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

    //let channelPostsNumber: number = 0;
    // this.channelsService.getChannelDataById(0).subscribe(channelData => {
      
    //   this.channelPostsNumber = channelData["items"].length;
    //   //console.log(channelPostsNumber);
    // });

    // return channelPostsNumber;
  }

  getChannelAuthoursNumber() {
    //let authorCounter: number = 0;
    return this.channelsService.getChannelDataById(0);
    // this.channelsService.getChannelDataById(0).subscribe(channelData => {
    //   let authors: string[] = [];

    //   for (let item of channelData["items"]) {
    //     let author: string = item["author"];
    //     if (author === "") continue; //check if it works

    //     if (!~authors.indexOf(author)) {
    //       authors.push(author);
    //       authorCounter++;
    //     }
    //   }
    // });

    // return authorCounter;
  }

  getPieChartData() {
    //return this.channelsService.getChannelDataById(0);
    //add ChartJS library
    // this.channelsService.getChannelDataById(0).subscribe(channelData => {
    //   this.channelItemData.push({
    //     title: channelData["items"][0]["title"],
    //     content: channelData["items"][0]["content"],
    //     categories: channelData["items"][0]["categories"],
    //     pubDate: channelData["items"][0]["pubDate"],
    //     link: channelData["items"][0]["link"],
    //     author: channelData["items"][0]["author"]
    //   });

    //   console.log(this.channelItemData);

    //   //console.log(this.channelItemData);
      
    //   //this.arr.push(response);
    //   //console.log(channelsInfoArr);
    //   //return response;
    // });
  }
}
