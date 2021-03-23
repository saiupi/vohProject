import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CitiesListService } from './cities-list.service';

describe('CitiesListService', () => {
  let service: CitiesListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CitiesListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
