import { TestBed } from '@angular/core/testing';

import { ChannelPostsService } from './channel-posts.service';

describe('ChannelPostsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChannelPostsService = TestBed.get(ChannelPostsService);
    expect(service).toBeTruthy();
  });
});
