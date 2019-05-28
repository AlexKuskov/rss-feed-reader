import { TestBed } from '@angular/core/testing';

import { ChannelItemsService } from './channel-items.service';

describe('ChannelItemsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChannelItemsService = TestBed.get(ChannelItemsService);
    expect(service).toBeTruthy();
  });
});
