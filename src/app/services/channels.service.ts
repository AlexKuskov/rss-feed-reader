import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { ChannelData } from '../models/ChannelData';
import { errorHandler } from '../shared/utils';
import { StatisticsService } from './statistics.service';
import { ChannelPostContentService } from './channel-post-content.service';

@Injectable({
  providedIn: 'root'
})
export class ChannelsService {
  channels: string[] = [
    "https://www.rogerebert.com/feed",
    "https://www.instyle.com/feeds/all/ins.rss",
    "https://www.engadget.com/rss.xml",
    "https://www.wired.com/feed",
    "http://feeds.bbci.co.uk/news/rss.xml",
    "https://www.theguardian.com/uk/rss",
    "https://slate.com/feeds/all.rss",
    "http://www.cbn.com/cbnnews/us/feed/",
    "http://www.newyorker.com/services/rss/feeds/everything.xml",
    "https://www.dailysignal.com//feed/"
  ]

  xmlToJsonConverter: string = "https://rss2json.com/api.json?rss_url=";
  previousIndex: number;

  constructor(private http: HttpClient, private statisticsService: StatisticsService,
              private channelPostContentService: ChannelPostContentService) { }

  getChannelDataById(i: number): Observable<ChannelData> {
    return this.http.get<ChannelData>(this.xmlToJsonConverter + this.channels[i])
    .pipe(
      catchError(errorHandler)
    );
  }

  getChannelTitles(): Observable<Array<string>> {   
    let channelTitles$ = new Observable<Array<string>>(observer => {
      let channelTitles: string[];
      let channelObservables: Array<Observable<ChannelData>> = this.getAllChannelObservables();

      forkJoin(channelObservables)
        .subscribe(allChannelData => {
          channelTitles = this.getAllChannelTitles(allChannelData);
          
          observer.next(channelTitles);
        });
    });  

    return channelTitles$;
  }

  getAllChannelTitles(allChannelData: ChannelData[]): Array<string> {
    let channelTitles: string[] = [];

    allChannelData.forEach(channelData => {
      channelTitles.push(channelData.feed.title);
    });

    return channelTitles;
  }

  getAllChannelObservables(): Array<Observable<ChannelData>> {
    let channelObservables: Array<Observable<ChannelData>> = [];

    for (let i = 0; i < this.channels.length; i++) {
      channelObservables.push(this.getChannelDataById(i));
    }

    return channelObservables;
  }

  renderPostPanelAndStatisticsData(i: number, postContentState: boolean): void {
    if (!postContentState) {
      this.channelPostContentService.switchPanelToggle();
    }

    this.statisticsService.setChannelIndex(i);
    this.previousIndex = i;
  }

  showHidePostPanel(i: number, postContentState: boolean): void {
    if (i === this.previousIndex) {
      this.channelPostContentService.switchPanelToggle();
    } else {
      this.renderPostPanelAndStatisticsData(i, postContentState);
    }
  }
}
