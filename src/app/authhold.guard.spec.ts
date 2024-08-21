import { TestBed } from '@angular/core/testing';

import { AuthholdGuard } from './authhold.guard';

describe('AuthholdGuard', () => {
  let guard: AuthholdGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthholdGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
