import { TestBed } from '@angular/core/testing';

import { ProveedorArticuloService } from './proveedor-articulo.service';

describe('ProveedorArticuloService', () => {
  let service: ProveedorArticuloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProveedorArticuloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
