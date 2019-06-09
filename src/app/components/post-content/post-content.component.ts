import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
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

  fillPostData(channelIdx: number, postIdx: number): void {
    this.channelsService.getChannelDataById(channelIdx).subscribe(channelData => {
      const postContentItems: ChannelPostData = channelData.items[postIdx];
      let secureContent: SafeHtml = 
          this.domSanitizer.bypassSecurityTrustHtml(postContentItems.content.toString());
     
      this.channelPostData = [{
        title: postContentItems.title,
        content: secureContent,
        categories: postContentItems.categories,
        pubDate: postContentItems.pubDate,
        link: postContentItems.link,
        author: postContentItems.author
      }];
    });
  }

  clearPostData(): void {
    this.channelPostData = [];
  }

  isChannelPostDataDefined(): boolean {
    return this.channelPostData == undefined;
  }

  isPostAuthorDefined(postAuthor: string): boolean {
    return postAuthor != '';
  }

  isPostCategoriesDefined(categories: Array<string>): boolean {
    return categories.length > 0;
  }
}
