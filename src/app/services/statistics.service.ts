import { Injectable } from '@angular/core';
import { ChannelsService } from './channels.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private channelsService: ChannelsService) { }

  getChannelsNumber() {

  }

  getChannelItemsNumber() {

  }

  getChannelAuthoursNumber() {

  }

  getLettersPiechart() {
    
  }
}
