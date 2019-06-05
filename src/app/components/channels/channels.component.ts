import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ChannelsService } from '../../services/channels.service';
import { ChannelPostsComponent } from '../channel-posts/channel-posts.component';
import { StatisticsComponent } from '../statistics/statistics.component';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {
  channelTitles: string[] = [];
  prevIdx: number;
  
  @Input()
  statisticsComponent:StatisticsComponent;

  @Input()
  channelPostsComponent:ChannelPostsComponent;

  constructor(private channelsService: ChannelsService) { }

  ngOnInit() {
    this.fillChannelTitlesArray();
  }

  renderPostList(i: number) {
    if (i !== this.prevIdx) {
      if (!this.channelPostsComponent.panelState) {
        this.channelPostsComponent.panelToggle();
      }

      this.channelPostsComponent.clearPostTitles();
      this.channelPostsComponent.fillPostTitleArray(i);
      this.renderStatisticsData(i);
      this.prevIdx = i;
    } else {
      this.channelPostsComponent.panelToggle();
    }
  }

  renderStatisticsData(channelIdx: number) {
    this.statisticsComponent.getChannelPostsNumber(channelIdx);
    this.statisticsComponent.getChannelAuthoursNumber(channelIdx);
  }

  fillChannelTitlesArray() {
    for (let i = 0; i < this.channelsService.channelList.length; i++) {
      this.channelsService.getChannelDataById(i).subscribe(channelData => {
        this.channelTitles[i] = channelData.feed.title;
       });
    }
  }
}
