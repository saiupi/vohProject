import { TestBed } from '@angular/core/testing';

import { StaycationPackagesService } from './staycation-packages.service';

describe('StaycationPackagesService', () => {
  let service: StaycationPackagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaycationPackagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
