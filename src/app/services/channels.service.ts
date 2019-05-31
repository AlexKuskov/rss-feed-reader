import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ChannelInfo } from '../models/ChannelInfo';

@Injectable({
  providedIn: 'root'
})
export class ChannelsService {
  channelList: string[] = [
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

  constructor(private http: HttpClient) { }

  channels: Array<any> = [];

  getAllChannelData() {
    //let tempArrItem:Object = {};

    for (let channelListItem of this.channelList) {
      this.http.get(this.xmlToJsonConverter + channelListItem)
      .pipe(
        catchError(this.errorHandler)
      ).subscribe(response => {
        //console.log(response);
        this.channels.push(response)
        //tempArrItem = response;
      });
      //console.log(tempArrItem);
      //this.channels.push(tempArrItem);
    }

    // for (let channelListItem of this.channelList) {
    //   this.channels.push({
    //     one: 'one',
    //     two: 'two'
    //   });
    // }

    return this.channels;
  }

  getChannelDataById(i: number) {
    return this.http.get(this.xmlToJsonConverter + this.channelList[i])
    .pipe(
      catchError(this.errorHandler)
    );
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }

}
