import { TestBed } from '@angular/core/testing';

import { DummyUsersService } from './dummy-users.service';

describe('DummyUsersService', () => {
  let service: DummyUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DummyUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
