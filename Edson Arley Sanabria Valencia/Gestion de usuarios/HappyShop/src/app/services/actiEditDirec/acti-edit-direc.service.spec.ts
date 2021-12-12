import { TestBed } from '@angular/core/testing';

import { ActiEditDirecService } from './acti-edit-direc.service';

describe('ActiEditDirecService', () => {
  let service: ActiEditDirecService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiEditDirecService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
