import { TestBed } from '@angular/core/testing';

import { ChangeNotifyService } from './change-notify.service';

describe('ChangeNotifyService', () => {
  let service: ChangeNotifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeNotifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
