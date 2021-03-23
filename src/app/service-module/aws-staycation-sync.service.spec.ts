import { TestBed } from '@angular/core/testing';

import { AwsStaycationSyncService } from './aws-staycation-sync.service';

describe('AwsStaycationSyncService', () => {
  let service: AwsStaycationSyncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AwsStaycationSyncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
