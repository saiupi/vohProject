import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DestinationsApisService } from './destinations-apis.service';

describe('DestinationsApisService', () => {
  let service: DestinationsApisService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DestinationsApisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
