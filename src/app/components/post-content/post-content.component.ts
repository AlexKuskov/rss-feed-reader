import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ChannelsService } from '../../services/channels.service';
import { ChannelPostData } from '../../models/ChannelPostData';

@Component({
  selector: 'app-post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.scss']
})
export class PostContentComponent implements OnInit {

  channelPostData: ChannelPostData[] = [];

  constructor(private channelsService: ChannelsService, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    //this.fillPostDataArray();
    this.fillPostData(0, 1);
  }

  fillPostData(channelIdx: number, postIdx: number) {
    this.channelsService.getChannelDataById(channelIdx).subscribe(channelData => {
      let secureContent = this.domSanitizer.bypassSecurityTrustHtml(channelData["items"][postIdx]["content"]);
     
      this.channelPostData.push({
        title: channelData["items"][postIdx]["title"],
        content: secureContent,
        categories: channelData["items"][postIdx]["categories"],
        pubDate: channelData["items"][postIdx]["pubDate"],
        link: channelData["items"][postIdx]["link"],
        author: channelData["items"][postIdx]["author"]
      });

      //console.log(this.channelPostData);

      //console.log(this.channelItemData);
      
      //this.arr.push(response);
      //console.log(channelsInfoArr);
      //return response;
    });
  }

  clearPostData() {
    this.channelPostData = [];
  }

    //TODO: Add click listener on specific element
    // for (let i = 0; i < this.channelsService.channelList.length; i++) {
    //   this.channelsService.getChannelDataById(i).subscribe(channelData => {
    //     //console.log(channelData['items'][0]['title']);
        
    //     this.channelItemData.push({
    //       title: channelData["items"][0]["title"],
    //       content: channelData["items"][0]["content"],
    //       categories: channelData["items"][0]["categories"],
    //       pubDate: channelData["items"][0]["pubDate"],
    //       link: channelData["items"][0]["link"],
    //       author: channelData["items"][0]["author"]
    //     });

    //     this.channelItemData = {
    //       title: channelData["items"][0]["title"],
    //       content: channelData["items"][0]["content"],
    //       categories: channelData["items"][0]["categories"],
    //       pubDate: channelData["items"][0]["pubDate"],
    //       link: channelData["items"][0]["link"],
    //       author: channelData["items"][0]["author"]
    //     };

    //     //console.log(this.channelItemData);
        
    //     //this.arr.push(response);
    //     //console.log(channelsInfoArr);
    //     //return response;
    //   });
    // }
 // }

}
