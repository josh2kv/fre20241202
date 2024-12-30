import { TestBed } from '@angular/core/testing';

import { ItunesApiService } from './itunes-api.service';

describe('ItunesApiServiceTsService', () => {
  let service: ItunesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItunesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
