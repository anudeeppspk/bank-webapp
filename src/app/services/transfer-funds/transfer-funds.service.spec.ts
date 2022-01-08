import { TestBed } from '@angular/core/testing';

import { TransferFundsService } from './transfer-funds.service';

describe('TransferFundsService', () => {
  let service: TransferFundsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferFundsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
