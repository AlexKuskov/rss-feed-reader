import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ChannelsService } from '../../services/channels.service';
import { ChannelPostData } from '../../models/ChannelPostData';
import { ChannelPostContentService } from 'src/app/services/channel-post-content.service';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-post-content',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.scss']
})
export class PostContentComponent implements OnInit {

  channelPostData: ChannelPostData[];
  postContentState: boolean = false;

  constructor(private channelsService: ChannelsService, 
    private domSanitizer: DomSanitizer,
    private channelPostContentService: ChannelPostContentService,
    private statisticsService: StatisticsService) { }

  ngOnInit() {
    this.channelPostContentService.getPostContentState().subscribe(postContentState => {
      this.postContentState = postContentState;
    });
    this.statisticsService.getChannelPostIndeces().subscribe(indeces => {
      this.clearPostData();
      this.fillPostData(indeces[0], indeces[1]);
    });
  }

  fillPostData(channelIdx: number, postIdx: number) {
    this.channelsService.getChannelDataById(channelIdx).subscribe(channelData => {
      let secureContent = this.domSanitizer.bypassSecurityTrustHtml(channelData.items[postIdx].content);
     
      this.channelPostData = [{
        title: channelData.items[postIdx].title,
        content: secureContent,
        categories: channelData.items[postIdx].categories,
        pubDate: channelData.items[postIdx].pubDate,
        link: channelData.items[postIdx].link,
        author: channelData.items[postIdx].author
      }];
    });
  }

  clearPostData() {
    this.channelPostData = [];
  }
}
