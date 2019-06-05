import { TestBed } from '@angular/core/testing';

import { ChannelPostContentService } from './channel-post-content.service';

describe('ChannelPostContentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChannelPostContentService = TestBed.get(ChannelPostContentService);
    expect(service).toBeTruthy();
  });
});
