import { TestBed } from '@angular/core/testing';

import { MoviesCacheService } from './movies-cache.service';

describe('MoviesCacheService', () => {
  let service: MoviesCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoviesCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
