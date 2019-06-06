import { Component, OnInit, Input } from '@angular/core';
import { ChannelsService } from 'src/app/services/channels.service';
import { StatisticsService } from 'src/app/services/statistics.service';
import { ChannelPostContentService } from 'src/app/services/channel-post-content.service';

@Component({
  selector: 'app-channel-posts',
  templateUrl: './channel-posts.component.html',
  styleUrls: ['./channel-posts.component.scss']
})
export class ChannelPostsComponent implements OnInit {

  channelPostTitle: string[] = [];
  activeChannelIdx: number;
  panelState: boolean = false;

  constructor(private channelsService: ChannelsService,
    private statisticsService: StatisticsService,
    private channelPostContentService: ChannelPostContentService) { }

  ngOnInit() {
    this.statisticsService.getChannelIndex().subscribe(channelIdx => {
      this.clearPostTitles();
      this.fillPostTitleArray(channelIdx);
    });
    this.channelPostContentService.panelToggleLauncher().subscribe(() => {
      this.panelToggle();
    });
  }

  clearPostTitles() {
    this.channelPostTitle = [];
  }

  panelToggle() {
    this.panelState = !this.panelState;
    this.channelPostContentService.setPostContentState(this.panelState);
  }

  renderPostContent(postIdx: number) {
    this.statisticsService.setChannelPostIndeces(this.activeChannelIdx, postIdx);
    this.renderStatisticsPiechart(postIdx);
  }

  renderStatisticsPiechart(postIdx: number) {
    this.statisticsService.setChannelPostIndeces(this.activeChannelIdx, postIdx);
  }

  fillPostTitleArray(indx: number) {
    this.activeChannelIdx = indx;

    this.channelsService.getChannelDataById(indx).subscribe(channelData => {
      for (let i = 0; i < channelData.items.length; i++) {
        this.channelPostTitle.push(channelData.items[i].title);
        //added next code to emulate more than 10 items, because https://rss2json.com/ service doesn't allow
        //to load more than 10 items at once
        if (indx === 2) {
          this.channelPostTitle.push(channelData.items[i].title);
        }
      }
    });
  }

  getPostListItemHeight() {
    return 10 < this.channelPostTitle.length ? '10vh' : '10%';
  }
}
