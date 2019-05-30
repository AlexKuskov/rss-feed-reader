import { Component, OnInit } from '@angular/core';
import { ChannelsService } from 'src/app/services/channels.service';

@Component({
  selector: 'app-channel-posts',
  templateUrl: './channel-posts.component.html',
  styleUrls: ['./channel-posts.component.scss']
})
export class ChannelPostsComponent implements OnInit {

  //channelPostData: ChannelPostData[];
  channelPostTitle: string[] = [];

  constructor(private channelsService: ChannelsService) { }

  ngOnInit() {
    this.fillPostTitleArray();
    //add channelPostData[]
  }

  fillPostTitleArray() {
    //channelsInfoArr = [];
    //this.getAllChannelData();
    // let allChannelData = this.channelsService.getAllChannelData();
    // console.log(allChannelData[2]['length']);
    for (let i = 0; i < this.channelsService.channelList.length; i++) {
      this.channelsService.getChannelDataById(i).subscribe(channelData => {
        //console.log(channelData['Posts'][0]['title']);
        
        this.channelPostTitle.push(channelData["items"][0]["title"]);
        
        //this.arr.push(response);
        //console.log(channelsInfoArr);
        //return response;
      });
    }
  }

}
