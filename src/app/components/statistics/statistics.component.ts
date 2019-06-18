import { Component, OnInit } from '@angular/core';
import { ChannelsService } from 'src/app/services/channels.service';
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

    this.statisticsService.getChannelIndex().subscribe(channelIndex => {
      this.getChannelPostsNumber(channelIndex);
      this.getChannelAuthorsNumber(channelIndex);
    });
    this.statisticsService.getChannelPostIndices().subscribe(indices => {
      this.getPieChartData(indices.channelIndex, indices.postIndex);
    });
  }

  getChannelsNumber(): void {
    this.channelsNumber = this.channelsService.channels.length;
  }

  getChannelPostsNumber(channelIndex: number): void {
    this.channelsService.getChannelDataById(channelIndex).subscribe(channelData => {
      this.channelPostsNumber = channelData.items.length;
    });
  }

  getChannelAuthorsNumber(channelIndex: number): void {
    this.channelsService.getChannelDataById(channelIndex).subscribe(channelData => {
      this.channelAuthorsNumber = this.statisticsService.countAuthorNumber(channelData);
    });
  }

  getPieChartData(channelIndex: number, postIndex: number): void {
    this.channelsService.getChannelDataById(channelIndex).subscribe(channelData => {
      let letters: Object = this.statisticsService.getPreparedPieChartData(channelData, postIndex);
      this.setPieChartProperties(letters);
    });
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
