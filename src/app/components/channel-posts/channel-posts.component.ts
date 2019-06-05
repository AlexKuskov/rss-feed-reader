import { Component, OnInit, Input } from '@angular/core';
import { ChannelsService } from 'src/app/services/channels.service';
import { PostContentComponent } from '../post-content/post-content.component';
import { StatisticsComponent } from '../statistics/statistics.component';

@Component({
  selector: 'app-channel-posts',
  templateUrl: './channel-posts.component.html',
  styleUrls: ['./channel-posts.component.scss']
})
export class ChannelPostsComponent implements OnInit {

  channelPostTitle: string[] = [];
  activeChannelIdx: number;
  panelState: boolean = false;

  @Input()
  postContentComponent:PostContentComponent;

  @Input()
  statisticsComponent:StatisticsComponent;

  constructor(private channelsService: ChannelsService) { }

  ngOnInit() {
  }

  clearPostTitles() {
    this.channelPostTitle = [];
  }

  panelToggle() {
    this.panelState = !this.panelState;
    this.postContentComponent.postContentState = !this.postContentComponent.postContentState;
  }

  renderPostContent(postIdx: number) {
    this.postContentComponent.clearPostData();
    this.postContentComponent.fillPostData(this.activeChannelIdx, postIdx);
    this.renderStatisticsPiechart(postIdx);
  }

  renderStatisticsPiechart(postIdx: number) {
    this.statisticsComponent.getPieChartData(this.activeChannelIdx, postIdx);
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
}
