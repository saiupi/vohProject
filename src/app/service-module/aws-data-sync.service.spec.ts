import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AwsDataSyncService } from './aws-data-sync.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AwsDataSyncService', () => {
  let service: AwsDataSyncService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterModule.forRoot([])],
    });
    service = TestBed.inject(AwsDataSyncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
