import { Component, OnInit } from '@angular/core';
import { ChannelsService } from '../../services/channels.service';
import { ChannelPostContentService } from 'src/app/services/channel-post-content.service';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {
  channelTitles: string[] = [];
  postContentState: boolean;

  constructor(private channelsService: ChannelsService,
    private channelPostContentService: ChannelPostContentService) { }

  ngOnInit() {
    this.channelsService.channelTitles$.subscribe(channelTitles => {
      this.channelTitles = channelTitles;
    });
    this.channelPostContentService.getPostContentState().subscribe(postContentState => {
      this.postContentState = postContentState;
    });
  }

  sendChannelIndex(i: number): void {
    this.channelsService.showHidePostPanel(i, this.postContentState);
  }
}
