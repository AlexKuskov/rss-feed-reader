import { TestBed } from '@angular/core/testing';

import { ItemContentService } from './item-content.service';

describe('ItemContentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemContentService = TestBed.get(ItemContentService);
    expect(service).toBeTruthy();
  });
});
