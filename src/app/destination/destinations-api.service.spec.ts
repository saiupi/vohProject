import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DestinationsApiService } from './destinations-api.service';

describe('DestinationsApiService', () => {
  let service: DestinationsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DestinationsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
