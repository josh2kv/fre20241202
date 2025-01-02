import { TestBed } from '@angular/core/testing';

import { BooksServiceService } from './books-service.service';

describe('BooksServiceTsService', () => {
  let service: BooksServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BooksServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
