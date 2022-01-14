import { TestBed } from '@angular/core/testing';

import { EasyLoginGuard } from './easy-login.guard';

describe('EasyLoginGuard', () => {
  let guard: EasyLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EasyLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
