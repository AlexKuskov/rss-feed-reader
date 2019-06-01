import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics.service';
import { ChannelsService } from 'src/app/services/channels.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  public pieChartLabels:string[] = [];
  public pieChartData:number[] = [];
  public pieChartType:string; 
  public pieChartOptions:any;

  channelsNumber: number;
  channelPostsNumber: number;
  channelAuthoursNumber: number;

  
  constructor(private channelsService: ChannelsService) { }

  ngOnInit() {
    this.getPieChartData(0, 1);
    this.getChannelsNumber();
    // this.getChannelPostsNumber(0);
    // this.getChannelAuthoursNumber(0);
  }

  getChannelsNumber() {
    this.channelsNumber = this.channelsService.channelList.length;
  }

  getChannelPostsNumber(channelIdx: number) {
    this.channelsService.getChannelDataById(channelIdx).subscribe(channelData => {
      this.channelPostsNumber = channelData["items"].length;
    });
  }

  getChannelAuthoursNumber(channelIdx: number) {
    this.channelsService.getChannelDataById(channelIdx).subscribe(channelData => {
      let authors: string[] = [];

      for (let item of channelData["items"]) {
        let author: string = item["author"];
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
      
      let content: string = channelData["items"][postIdx]["content"];
      content = content.toLowerCase();
      let contentSymbols: string[] = content.split('').filter(i => {
        return ('a' <= i && i <= 'z');
      });
      contentSymbols.sort();

      for (let i = 0; i < contentSymbols.length; i++) {
        let num = contentSymbols[i];
        letters[num] = letters[num] ? letters[num] + 1 : 1;
      }

      this.pieChartLabels = Object.keys(letters);
      this.pieChartData = Object.values(letters);
      this.pieChartType = 'pie';
      this.pieChartOptions = {
              legend: {
                display: false
              }
          };
    });
  }

}
