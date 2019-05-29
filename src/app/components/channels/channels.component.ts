import { Component, OnInit } from '@angular/core';
import { ChannelsService } from '../../services/channels.service'

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {
  //channelInfo:ChannelInfo[];

  constructor(private channelsService: ChannelsService) { }

  ngOnInit() {
    // for (let i = 0; i < 10; i++) {
    //   this.channelsService.testFunc()[i].subscribe(result => {
    //     console.log(result);
    //   });
      
    // }

    console.log(this.channelsService.testFunc());
    
  }

  //channel image, channel title

}
