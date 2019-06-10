import { TestBed } from '@angular/core/testing';

import { PostContentService } from './post-content.service';

describe('PostContentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostContentService = TestBed.get(PostContentService);
    expect(service).toBeTruthy();
  });
});
