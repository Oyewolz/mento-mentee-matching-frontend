import { TestBed } from '@angular/core/testing';

import { OrienteeService } from './orientee.service';

describe('OrienteeService', () => {
  let service: OrienteeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrienteeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
