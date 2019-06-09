import { Component, OnInit } from '@angular/core';
import { ChannelsService } from 'src/app/services/channels.service';
import { StatisticsService } from 'src/app/services/statistics.service';
import { ChannelPostContentService } from 'src/app/services/channel-post-content.service';

@Component({
  selector: 'app-channel-posts',
  templateUrl: './channel-posts.component.html',
  styleUrls: ['./channel-posts.component.scss']
})
export class ChannelPostsComponent implements OnInit {

  channelPostTitles: string[] = [];
  activeChannelIndex: number;
  panelState: boolean = false;

  constructor(private channelsService: ChannelsService,
    private statisticsService: StatisticsService,
    private channelPostContentService: ChannelPostContentService) { }

  ngOnInit() {
    this.statisticsService.getChannelIndex().subscribe(channelIndex => {
      this.clearPostTitles();
      this.fillPostTitles(channelIndex);
    });
    this.channelPostContentService.panelToggleLauncher().subscribe(() => {
      this.panelToggle();
    });
  }

  clearPostTitles(): void {
    this.channelPostTitles = [];
  }

  panelToggle(): void {
    this.panelState = !this.panelState;
    this.channelPostContentService.setPostContentState(this.panelState);
  }

  renderPostContent(postIndex: number): void {
    this.statisticsService.setChannelPostIndices(this.activeChannelIndex, postIndex);
    this.renderStatisticsPiechart(postIndex);
  }

  renderStatisticsPiechart(postIndex: number): void {
    this.statisticsService.setChannelPostIndices(this.activeChannelIndex, postIndex);
  }

  fillPostTitles(index: number): void {
    this.activeChannelIndex = index;

    this.channelsService.getChannelDataById(index).subscribe(channelData => {
      for (let i = 0; i < channelData.items.length; i++) {
        this.channelPostTitles.push(channelData.items[i].title);
        //added next code to emulate more than 10 items, because https://rss2json.com/ service doesn't allow
        //to load more than 10 items at once
        if (index === 2) {
          this.channelPostTitles.push(channelData.items[i].title);
        }
      }
    });
  }
}
