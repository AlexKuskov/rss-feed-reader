import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ChannelsService } from '../../services/channels.service';
import { ChannelPostData } from '../../models/channel-post-data';
import { ChannelPostContentService } from 'src/app/services/channel-post-content.service';
import { StatisticsService } from 'src/app/services/statistics.service';
import { PostContentService } from 'src/app/services/post-content.service';

@Component({
  selector: 'app-post-content',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.scss']
})
export class PostContentComponent implements OnInit {

  channelPostData: ChannelPostData;
  postContentState: boolean = false;

  constructor(private channelsService: ChannelsService, 
    private channelPostContentService: ChannelPostContentService,
    private statisticsService: StatisticsService,
    private postContentService: PostContentService) { }

  ngOnInit() {
    this.channelPostContentService.getPostContentState().subscribe(postContentState => {
      this.postContentState = postContentState;
    });

    this.statisticsService.channelPostIndices$.subscribe(indices => {
      this.channelsService.getChannelDataById(indices.channelIndex).subscribe(channelData => {
        this.channelPostData = this.postContentService.getPostData(indices.postIndex, channelData);
      });
    });
  }

  get isChannelPostDataDefined(): boolean {
    return !this.channelPostData;
  }

  isPostAuthorDefined(postAuthor: string): boolean {
    return postAuthor !== '';
  }

  isPostCategoriesDefined(categories: Array<string>): boolean {
    return categories.length > 0;
  }
}
