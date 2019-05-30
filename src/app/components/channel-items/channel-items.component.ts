import { Component, OnInit } from '@angular/core';
import { ChannelItemData } from '../../models/ChannelItemData'

@Component({
  selector: 'app-channel-items',
  templateUrl: './channel-items.component.html',
  styleUrls: ['./channel-items.component.scss']
})
export class ChannelItemsComponent implements OnInit {

  channelItemData:ChannelItemData[];

  constructor() { }

  ngOnInit() {
    //add channelItemData[]
  }

}
