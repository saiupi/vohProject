import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { UserItineraryService } from './user-itinerary.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserItineraryService', () => {
  let service: UserItineraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterModule.forRoot([])],
    });
    service = TestBed.inject(UserItineraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
