import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ChannelData } from '../models/ChannelData';
import { Utils } from '../shared/utils';

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

  constructor(private http: HttpClient) { }

  getChannelDataById(i: number): Observable<ChannelData> {
    return this.http.get<ChannelData>(this.xmlToJsonConverter + this.channels[i])
    .pipe(
      catchError(Utils.errorHandler)
    );
  }
}
