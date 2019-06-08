import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChannelPostContentService {

  private postContentStateTransmitter: Subject<boolean> = new Subject<boolean>();
  private panelToggleSubject: Subject<void> = new Subject<void>();

  constructor() { }

  getPostContentState(): Observable<boolean> {
    return this.postContentStateTransmitter.asObservable();
  }

  setPostContentState(postContentState: boolean): void {
    this.postContentStateTransmitter.next(postContentState);
  }

  switchPanelToggle(): void {
    this.panelToggleSubject.next();
  }

  panelToggleLauncher(): Observable<void> {
    return this.panelToggleSubject.asObservable();
  }
}
