import { TestBed } from '@angular/core/testing';

import { CanceltripService } from './canceltrip.service';

describe('CanceltripService', () => {
  let service: CanceltripService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanceltripService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
