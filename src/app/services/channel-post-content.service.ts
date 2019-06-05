import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChannelPostContentService {

  private subject = new Subject<any>();

  constructor() { }

  getPostContentState() {
    return this.subject.asObservable();
  }

  setPostContentState(postContentState: boolean) {
    this.subject.next(postContentState);
  }
}
