import { TestBed } from '@angular/core/testing';

import { CustomPaymentGuardGuard } from './custom-payment-guard.guard';

describe('CustomPaymentGuardGuard', () => {
  let guard: CustomPaymentGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CustomPaymentGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
