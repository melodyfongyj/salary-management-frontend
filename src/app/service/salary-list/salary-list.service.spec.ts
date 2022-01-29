import { TestBed } from '@angular/core/testing';

import { SalaryListService } from './salary-list.service';

describe('SalaryListService', () => {
  let service: SalaryListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalaryListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
