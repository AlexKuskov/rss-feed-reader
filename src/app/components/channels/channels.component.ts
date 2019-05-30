import { Component, OnInit } from '@angular/core';
import { ChannelsService } from '../../services/channels.service';
import { ChannelInfo } from '../../models/ChannelInfo';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {
  channelInfo: ChannelInfo[] = [];

  constructor(private channelsService: ChannelsService) { }

  ngOnInit() {
    this.fillChannelInfoArray();
    // console.log(this.channelsService.getAllChannelData());
    // this.arr = this.channelsService.getAllChannelData();
    // console.log(this.arr);
    //console.log(this.channelsService.getChannelInfoArray(this.channelInfo));
    
    
    // this.channelInfo = [];
    // this.channelInfo.push({
    //   image: 'something',
    //   title: 'some'
    // })
    //TODO: add channel info here through DataProvider service



    // for (let i = 0; i < 10; i++) {
    //   this.channelsService.testFunc()[i].subscribe(result => {
    //     console.log(result);
    //   });
      
    // }
    //let inf:Object;

    
    
    
    // arr.forEach(item => {
    //   console.log('it');
    //   console.log(item);
    // });
    
    //console.log(inf);

    //console.log(this.getChannelInfoArray(this.channelInfo));
    
  }

  fillChannelInfoArray() {
    //channelsInfoArr = [];
    //this.getAllChannelData();
    // let allChannelData = this.channelsService.getAllChannelData();
    // console.log(allChannelData[2]['length']);
    for (let i = 0; i < this.channelsService.channelList.length; i++) {
      this.channelsService.getChannelDataById(i).subscribe(channelData => {
        //debugger;
        this.channelInfo.push({
          image: channelData['feed']['image'],
          title: channelData['feed']['title']
        });
        
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



  //channel image, channel title

}
