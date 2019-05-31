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
  channelAuthoursNumber: number = 0;

  
  constructor(private channelsService: ChannelsService) { }

  ngOnInit() {
    this.getPieChartData();
    this.getChannelsNumber();
    this.getChannelPostsNumber();
    this.getChannelAuthoursNumber();
  }

  getChannelsNumber() {
    this.channelsNumber = this.channelsService.channelList.length;
  }

  getChannelPostsNumber() {
    this.channelsService.getChannelDataById(0).subscribe(channelData => {
      this.channelPostsNumber = channelData["items"].length;
    });
  }

  getChannelAuthoursNumber() {
    this.channelsService.getChannelDataById(0).subscribe(channelData => {
      let authors: string[] = [];

      for (let item of channelData["items"]) {
        let author: string = item["author"];
        if (author === "") continue;

        if (!~authors.indexOf(author)) {
          authors.push(author);
          this.channelAuthoursNumber++;
        }
      }
    });
  }

  getPieChartData() {
    this.channelsService.getChannelDataById(0).subscribe(channelData => {
      let letters = {};
      
      let content: string = channelData["items"][0]["content"];
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
