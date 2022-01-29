import { TestBed } from '@angular/core/testing';

import { GetEmpService } from './get-emp.service';

describe('GetEmpidService', () => {
  let service: GetEmpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetEmpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
