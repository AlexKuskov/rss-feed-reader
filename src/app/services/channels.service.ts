import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChannelsService {
  channelList: string[] = [
    "https://www.rogerebert.com/feed",
    "http://feeds.skynews.com/feeds/rss/uk.xml",
    "https://www.engadget.com/rss.xml",
    "https://www.wired.com/feed",
    "http://feeds.bbci.co.uk/news/rss.xml",
    "https://www.theguardian.com/uk/rss",
    "http://www1.cbn.com/app_feeds/rss/news/rss.php?section=us",
    "http://www.cbn.com/cbnnews/us/feed/",
    "http://www.newyorker.com/services/rss/feeds/everything.xml",
    "https://www.dailysignal.com//feed/"
  ]

  rssUrl: string = "http://feeds.skynews.com/feeds/rss/uk.xml"; //"https://www.engadget.com/rss.xml";
  str: string = "https://rss2json.com/api.json?rss_url=https://www.engadget.com/rss.xml"; //last resort

  xmlToJsonConverter:string = "https://rss2json.com/api.json?rss_url=";

  channelsArr: Array<Object> = [];

  constructor(private http: HttpClient) { }

  //TODO: add Observable with JSON object
  testFunc() {
    for (let channelListItem of this.channelList) {
      this.http.get(this.xmlToJsonConverter + channelListItem)
      .pipe(
        catchError(this.errorHandler)
      ).subscribe(data => this.channelsArr.push(data));
    }

    return this.channelsArr;
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }

}
