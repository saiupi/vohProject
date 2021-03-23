import { TestBed } from '@angular/core/testing';

import { StaycationPaymentGuardGuard } from './staycation-payment-guard.guard';

describe('StaycationPaymentGuardGuard', () => {
  let guard: StaycationPaymentGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(StaycationPaymentGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
