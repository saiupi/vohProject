import { TestBed } from '@angular/core/testing';

import { BookingServiceService } from './booking-service.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('BookingServiceService', () => {
  let service: BookingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
      ],
    });
    service = TestBed.inject(BookingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
