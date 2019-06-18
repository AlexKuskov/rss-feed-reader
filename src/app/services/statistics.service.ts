import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ChannelData } from '../models/channel-data';
import { ChannelPostData } from '../models/channel-post-data';
import { Indices } from '../models/indices';
import { distinct } from '../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private channelIndexTransmitter$: Subject<number> = new Subject<number>();
  private twoIndicesTransmitter$: Subject<Indices> = new Subject<Indices>();

  constructor() { }

  setChannelIndex(channelIndex: number): void {
    this.channelIndexTransmitter$.next(channelIndex);
  }

  getChannelIndex(): Observable<number> {
    return this.channelIndexTransmitter$.asObservable();
  }

  setChannelPostIndices(channelIndex: number, postIndex: number): void {
    this.twoIndicesTransmitter$.next({channelIndex, postIndex});
  }

  getChannelPostIndices(): Observable<Indices> {
    return this.twoIndicesTransmitter$.asObservable();
  }

  countAuthorNumber(channelData: ChannelData): number {
    return channelData.items
        .map(item => item.author)
        .filter(author => !!author)
        .filter(distinct)
        .length;
  }

  getPreparedPieChartData(channelData: ChannelData, postIndex: number): Object {
    let content: string = this.getAllPostContentCharacters(channelData, postIndex);                     
    let contentLetters: string[] = this.getLetters(content).sort();

    return this.getEachLetterNumber(contentLetters);
  }

  getLetters(content: string): string[] {
    content = content.toLowerCase();

    return content.split('').filter(i => 'a' <= i && i <= 'z');
  }

  getAllPostContentCharacters(channelData: ChannelData, i: number): string {
    const postContentItems: ChannelPostData = channelData.items[i];

    return postContentItems.title.concat(
      postContentItems.content.toString(),
      postContentItems.categories.toString(),
      postContentItems.author
    );
  }

  getEachLetterNumber(contentLetters: string[]): Object {
    let letters: Object = {};

    contentLetters.forEach(letterKey => {
      letters[letterKey] = letters[letterKey] ? letters[letterKey] + 1 : 1;
    });

    return letters;
  }
}
