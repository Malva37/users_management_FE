import { TestBed } from '@angular/core/testing';

import { UsersFromServerService } from './users-from-server.service';

describe('UsersFromServerService', () => {
  let service: UsersFromServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersFromServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
