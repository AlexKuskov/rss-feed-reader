import { Injectable } from '@angular/core';
import { ChannelPostData } from '../models/channel-post-data';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { ChannelData } from '../models/channel-data';

@Injectable({
  providedIn: 'root'
})
export class PostContentService {

  constructor(private domSanitizer: DomSanitizer) { }

  getPostData(postIndex: number, channelData: ChannelData): ChannelPostData {
    const postContentItems: ChannelPostData = channelData.items[postIndex];
    let secureContent: SafeHtml = 
        this.domSanitizer.bypassSecurityTrustHtml(postContentItems.content.toString());
    
    return {
      title: postContentItems.title,
      content: secureContent,
      categories: postContentItems.categories,
      pubDate: postContentItems.pubDate,
      link: postContentItems.link,
      author: postContentItems.author
    };
  }
}
