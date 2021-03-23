import { TestBed } from '@angular/core/testing';

import { SelectTravellersGuard } from './select-travellers.guard';

describe('SelectTravellersGuard', () => {
  let guard: SelectTravellersGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SelectTravellersGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
