import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  public pieChartLabels:string[] = ["Pending", "InProgress", "OnHold", "Complete", "Cancelled"];
  public pieChartData:number[] = [21, 39, 10, 14, 16];
  public pieChartType:string = 'pie';
  public pieChartOptions:any = {backgroundColor: [
              "#FF6384",
              "#4BC0C0",
              "#FFCE56",
              "#E7E9ED",
              "#36A2EB"
              ],
              legend: {
                display: false
              }
          }

  channelsNumber: number;
  channelPostsNumber: number;
  channelAuthoursNumber: number = 0;


  constructor(private statisticsService: StatisticsService) { }

  ngOnInit() {
    this.channelsNumber = this.statisticsService.getChannelsNumber();
    
    this.statisticsService.getChannelPostsNumber().subscribe(channelData => {
      this.channelPostsNumber = channelData["items"].length;
    });
    
    this.statisticsService.getChannelAuthoursNumber().subscribe(channelData => {
      let authors: string[] = [];

      for (let item of channelData["items"]) {
        console.log(item);
        let author: string = item["author"];
        if (author === "") continue; //check if it works

        if (!~authors.indexOf(author)) {
          authors.push(author);
          this.channelAuthoursNumber++;
        }
      }
    });
  }

  
 
  
  

}
