import { TestBed } from '@angular/core/testing';

import { UpdateSalaryService } from './update-salary.service';

describe('UpdateSalaryService', () => {
  let service: UpdateSalaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateSalaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
