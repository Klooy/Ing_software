import { TestBed } from '@angular/core/testing';

import { ActivarMiCuentaService } from './activar-mi-cuenta.service';

describe('ActivarMiCuentaService', () => {
  let service: ActivarMiCuentaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivarMiCuentaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
