import { Component, OnInit } from '@angular/core';
import { ChannelsService } from 'src/app/services/channels.service';
import { ChannelData } from 'src/app/models/ChannelData';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  public pieChartLabels:string[];
  public pieChartData:number[];
  public pieChartType:string; 
  public pieChartOptions:any;

  channelsNumber: number;
  channelPostsNumber: number;
  channelAuthoursNumber: number;

  
  constructor(private channelsService: ChannelsService, 
    private statisticsService: StatisticsService) {
      
  }

  ngOnInit() {
    this.getChannelsNumber();
    this.statisticsService.getChannelIndex().subscribe(index => {
      this.getChannelPostsNumber(index);
      this.getChannelAuthoursNumber(index);
    });
  }

  getChannelsNumber() {
    this.channelsNumber = this.channelsService.channelList.length;
  }

  getChannelPostsNumber(channelIdx: number) {
    this.channelsService.getChannelDataById(channelIdx).subscribe(channelData => {
      this.channelPostsNumber = channelData.items.length;
    });
  }

  getChannelAuthoursNumber(channelIdx: number) {
    this.channelsService.getChannelDataById(channelIdx).subscribe(channelData => {
      let authors: string[] = [];

      for (let item of channelData.items) {
        let author: string = item.author;
        if (author === "") continue;

        if (!~authors.indexOf(author)) {
          authors.push(author);
        }
      }

      this.channelAuthoursNumber = authors.length;
    });
  }

  getPieChartData(channelIdx: number, postIdx: number) {
    this.channelsService.getChannelDataById(channelIdx).subscribe(channelData => {
      let letters = {};
      
      let content: string = this.getAllPostContentCharacters(channelData, postIdx);                     
      let contentLetters: string[] = this.getLetters(content);
      contentLetters.sort();

      letters = this.getEachLetterNumber(contentLetters);
      this.setPieChartProperties(letters);
    });
  }

  getLetters(content: string) {
    content = content.toLowerCase();

    return content.split('').filter(i => {
      return ('a' <= i && i <= 'z');
    });
  }

  getAllPostContentCharacters(channelData: ChannelData, i: number) {
    return channelData.items[i].content.concat(
      channelData.items[i].title,
      channelData.items[i].categories.toString(),
      channelData.items[i].author
    );
  }

  getEachLetterNumber(contentLetters: string[]): Object {
    let letters = {};

    for (let i = 0; i < contentLetters.length; i++) {
      let num = contentLetters[i];
      letters[num] = letters[num] ? letters[num] + 1 : 1;
    }

    return letters;
  }

  setPieChartProperties(letters: Object) {
    this.pieChartLabels = Object.keys(letters);
    this.pieChartData = Object.values(letters);
    this.pieChartType = 'pie';
    this.pieChartOptions = {
            legend: {
              display: false
            }
        };
  }

}
