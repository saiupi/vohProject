import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AwsTranscationSyncService } from './aws-transcation-sync.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AwsTranscationSyncService', () => {
  let service: AwsTranscationSyncService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    service = TestBed.inject(AwsTranscationSyncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
