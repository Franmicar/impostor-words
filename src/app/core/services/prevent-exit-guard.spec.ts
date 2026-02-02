import { TestBed } from '@angular/core/testing';

import { PreventExitGuard } from './prevent-exit-guard';

describe('PreventExitGuard', () => {
  let service: PreventExitGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreventExitGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
