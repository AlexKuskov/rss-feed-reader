import { Component, OnInit } from '@angular/core';
import { ChannelsService } from '../../services/channels.service';
import { ChannelItemData } from '../../models/ChannelItemData';

@Component({
  selector: 'app-item-content',
  templateUrl: './item-content.component.html',
  styleUrls: ['./item-content.component.scss']
})
export class ItemContentComponent implements OnInit {

  channelItemData: ChannelItemData[] = [];

  constructor(private channelsService: ChannelsService) { }

  ngOnInit() {
    this.fillItemDataArray();
  }

  fillItemDataArray() {
    this.channelsService.getChannelDataById(0).subscribe(channelData => {
      this.channelItemData.push({
        title: channelData["items"][0]["title"],
        content: channelData["items"][0]["content"],
        categories: channelData["items"][0]["categories"],
        pubDate: channelData["items"][0]["pubDate"],
        link: channelData["items"][0]["link"],
        author: channelData["items"][0]["author"]
      });

      console.log(this.channelItemData);

      //console.log(this.channelItemData);
      
      //this.arr.push(response);
      //console.log(channelsInfoArr);
      //return response;
    });
  }

    //TODO: Add click listener on specific element
    // for (let i = 0; i < this.channelsService.channelList.length; i++) {
    //   this.channelsService.getChannelDataById(i).subscribe(channelData => {
    //     //console.log(channelData['items'][0]['title']);
        
    //     this.channelItemData.push({
    //       title: channelData["items"][0]["title"],
    //       content: channelData["items"][0]["content"],
    //       categories: channelData["items"][0]["categories"],
    //       pubDate: channelData["items"][0]["pubDate"],
    //       link: channelData["items"][0]["link"],
    //       author: channelData["items"][0]["author"]
    //     });

    //     this.channelItemData = {
    //       title: channelData["items"][0]["title"],
    //       content: channelData["items"][0]["content"],
    //       categories: channelData["items"][0]["categories"],
    //       pubDate: channelData["items"][0]["pubDate"],
    //       link: channelData["items"][0]["link"],
    //       author: channelData["items"][0]["author"]
    //     };

    //     //console.log(this.channelItemData);
        
    //     //this.arr.push(response);
    //     //console.log(channelsInfoArr);
    //     //return response;
    //   });
    // }
 // }

}
