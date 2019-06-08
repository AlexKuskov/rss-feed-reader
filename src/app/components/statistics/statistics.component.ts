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

  public pieChartLabels: string[];
  public pieChartData: number[];
  public pieChartType: string; 
  public pieChartOptions: Object;

  channelsNumber: number;
  channelPostsNumber: number;
  channelAuthorsNumber: number;

  
  constructor(private channelsService: ChannelsService, 
    private statisticsService: StatisticsService) {
      
  }

  ngOnInit() {
    this.getChannelsNumber();

    this.statisticsService.getChannelIndex().subscribe(channelIdx => {
      this.getChannelPostsNumber(channelIdx);
      this.getChannelAuthorsNumber(channelIdx);
    });
    this.statisticsService.getChannelPostIndeces().subscribe(indeces => {
      this.getPieChartData(indeces[0], indeces[1]);
    });
  }

  getChannelsNumber(): void {
    this.channelsNumber = this.channelsService.channels.length;
  }

  getChannelPostsNumber(channelIdx: number): void {
    this.channelsService.getChannelDataById(channelIdx).subscribe(channelData => {
      this.channelPostsNumber = channelData.items.length;
    });
  }

  getChannelAuthorsNumber(channelIdx: number): void {
    this.channelsService.getChannelDataById(channelIdx).subscribe(channelData => {
      let authors: string[] = [];

      for (let item of channelData.items) {
        let author: string = item.author;
        if (author === "") continue;

        if (!~authors.indexOf(author)) {
          authors.push(author);
        }
      }

      this.channelAuthorsNumber = authors.length;
    });
  }

  getPieChartData(channelIdx: number, postIdx: number): void {
    this.channelsService.getChannelDataById(channelIdx).subscribe(channelData => {
      let letters: Object = {};
      
      let content: string = this.getAllPostContentCharacters(channelData, postIdx);                     
      let contentLetters: string[] = this.getLetters(content);
      contentLetters.sort();

      letters = this.getEachLetterNumber(contentLetters);
      this.setPieChartProperties(letters);
    });
  }

  getLetters(content: string): string[] {
    content = content.toLowerCase();

    return content.split('').filter(i => 'a' <= i && i <= 'z');
  }

  getAllPostContentCharacters(channelData: ChannelData, i: number): string {
    return channelData.items[i].title.concat(
      channelData.items[i].content.toString(),
      channelData.items[i].categories.toString(),
      channelData.items[i].author
    );
  }

  getEachLetterNumber(contentLetters: string[]): Object {
    let letters: Object = {};

    for (let i = 0; i < contentLetters.length; i++) {
      let num = contentLetters[i];
      letters[num] = letters[num] ? letters[num] + 1 : 1;
    }

    return letters;
  }

  setPieChartProperties(letters: Object): void {
    this.pieChartLabels = Object.keys(letters);
    this.pieChartData = Object.values(letters);
    this.pieChartType = 'pie';
    this.pieChartOptions = {
            legend: {
              display: false
            }
        };
  }

  isChannelPostsNumberDefined(): boolean {
    return this.channelPostsNumber == undefined;
  }

  isChannelAuthorsNumberDefined(): boolean {
    return this.channelAuthorsNumber == undefined;
  }

  isPieChartLabelsDefined(): boolean {
    return this.pieChartLabels == undefined;
  }

}
