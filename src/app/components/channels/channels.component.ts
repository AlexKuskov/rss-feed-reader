import { Component, OnInit } from '@angular/core';
import { ChannelsService } from '../../services/channels.service';
import { StatisticsService } from 'src/app/services/statistics.service';
import { ChannelPostContentService } from 'src/app/services/channel-post-content.service';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {
  channelTitles: string[] = [];
  prevIdx: number;
  postContentState: boolean;

  constructor(private channelsService: ChannelsService,
    private statisticsService: StatisticsService,
    private channelPostContentService: ChannelPostContentService) { }

  ngOnInit() {
    this.fillChannelTitles();
    this.channelPostContentService.getPostContentState().subscribe(postContentState => {
      this.postContentState = postContentState;
    });
  }

  showPostPanel(i: number): void {
    if (i !== this.prevIdx) {
      if (!this.postContentState) {
        this.channelPostContentService.switchPanelToggle();
      }

      this.renderPostPanelAndStatisticsData(i);
      this.prevIdx = i;
    } else {
      this.channelPostContentService.switchPanelToggle();
    }
  }

  renderPostPanelAndStatisticsData(i: number): void {
    this.statisticsService.setChannelIndex(i);
  }

  fillChannelTitles(): void {
    for (let i = 0; i < this.channelsService.channels.length; i++) {
      this.channelsService.getChannelDataById(i).subscribe(channelData => {
        this.channelTitles[i] = channelData.feed.title;
       });
    }
  }
}
