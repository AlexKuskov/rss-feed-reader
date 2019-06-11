import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ChannelData } from '../models/ChannelData';
import { ChannelPostData } from '../models/ChannelPostData';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private channelIndexTransmitter$: Subject<number> = new Subject<number>();
  private twoIndicesTransmitter$: Subject<Array<number>> = new Subject<Array<number>>();

  constructor() { }

  setChannelIndex(channelIndex: number): void {
    this.channelIndexTransmitter$.next(channelIndex);
  }

  getChannelIndex(): Observable<number> {
    return this.channelIndexTransmitter$.asObservable();
  }

  setChannelPostIndices(channelIndex: number, postIdx: number): void {
    this.twoIndicesTransmitter$.next([channelIndex, postIdx]);
  }

  getChannelPostIndices(): Observable<Array<number>> {
    return this.twoIndicesTransmitter$.asObservable();
  }

  countAuthorNumber(channelData: ChannelData): number {
    let authors: string[] = [];

    channelData.items.forEach(item => {
      const author: string = item.author;

      if (author !== "" && !~authors.indexOf(author)) {
        authors.push(author);
      }
    });
    
    return authors.length;
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
