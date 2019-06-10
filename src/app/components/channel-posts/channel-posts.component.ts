import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics.service';
import { ChannelPostContentService } from 'src/app/services/channel-post-content.service';
import { ChannelPostsService } from 'src/app/services/channel-posts.service';

@Component({
  selector: 'app-channel-posts',
  templateUrl: './channel-posts.component.html',
  styleUrls: ['./channel-posts.component.scss']
})
export class ChannelPostsComponent implements OnInit {

  channelPostTitles: string[] = [];
  panelState: boolean = false;

  constructor(private statisticsService: StatisticsService,
    private channelPostContentService: ChannelPostContentService,
    private channelPostsService: ChannelPostsService) { }

  ngOnInit() {
    this.statisticsService.getChannelIndex().subscribe(channelIndex => {
      this.channelPostTitles = [];
      this.channelPostTitles = this.channelPostsService.getPostTitles(channelIndex);
    });
    this.channelPostContentService.panelToggleLauncher().subscribe(() => {
      this.panelToggle();
    });
  }

  panelToggle(): void {
    this.panelState = !this.panelState;
    this.channelPostContentService.setPostContentState(this.panelState);
  }

  renderPostContent(postIndex: number): void {
    this.statisticsService.setChannelPostIndices(this.channelPostsService.activeChannelIndex, postIndex);
    this.renderStatisticsPiechart(postIndex);
  }

  renderStatisticsPiechart(postIndex: number): void {
    this.statisticsService.setChannelPostIndices(this.channelPostsService.activeChannelIndex, postIndex);
  }
}
