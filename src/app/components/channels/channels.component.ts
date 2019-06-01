import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ChannelsService } from '../../services/channels.service';
import { ChannelPostsComponent } from '../channel-posts/channel-posts.component';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {
  channelTitles: string[] = [];
  //public channelPostsComponent: ChannelPostsComponent
  @Input()
  channelPostsComponent:ChannelPostsComponent;

  constructor(private channelsService: ChannelsService) { }

  ngOnInit() {
    this.fillChannelTitlesArray();
  }

  //@HostListener('click')
  renderPostList(i: number) {
    //this.channelPostsComponent.visibility = 'none';
    this.channelPostsComponent.clearPostTitles();
    this.channelPostsComponent.fillPostTitleArray(i);
    //this.channelPostsComponent.visibility = 'block';
  }

  fillChannelTitlesArray() {
    //channelsInfoArr = [];
    //this.getAllChannelData();
    // let allChannelData = this.channelsService.getAllChannelData();
    // console.log(allChannelData[2]['length']);
    for (let i = 0; i < this.channelsService.channelList.length; i++) {
      this.channelsService.getChannelDataById(i).subscribe(channelData => {
        //debugger;
        this.channelTitles[i] = channelData['feed']['title'];
        //this.channelTitles.push(channelData['feed']['title']);
        
        //this.arr.push(response);
        //console.log(channelsInfoArr);
        //return response;
      });
    }

    // for (let channelData of allChannelData) {
    //   console.log(channelData);
    //   channelsInfoArr.push({
    //     image: channelData['feed']['image'],
    //     title: channelData['feed']['title']
    //   });
    // }
    // return channelsInfoArr;
  }


}
