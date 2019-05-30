import { Component, OnInit } from '@angular/core';
import { ChannelsService } from 'src/app/services/channels.service';

@Component({
  selector: 'app-channel-items',
  templateUrl: './channel-items.component.html',
  styleUrls: ['./channel-items.component.scss']
})
export class ChannelItemsComponent implements OnInit {

  //channelItemData: ChannelItemData[];
  channelItemTitle: string[] = [];

  constructor(private channelsService: ChannelsService) { }

  ngOnInit() {
    this.fillItemTitleArray();
    //add channelItemData[]
  }

  fillItemTitleArray() {
    //channelsInfoArr = [];
    //this.getAllChannelData();
    // let allChannelData = this.channelsService.getAllChannelData();
    // console.log(allChannelData[2]['length']);
    for (let i = 0; i < this.channelsService.channelList.length; i++) {
      this.channelsService.getChannelDataById(i).subscribe(channelData => {
        //console.log(channelData['items'][0]['title']);
        
        this.channelItemTitle.push(channelData["items"][0]["title"]);
        
        //this.arr.push(response);
        //console.log(channelsInfoArr);
        //return response;
      });
    }
  }

}
