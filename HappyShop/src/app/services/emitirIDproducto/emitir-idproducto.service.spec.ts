import { TestBed } from '@angular/core/testing';

import { EmitirIDproductoService } from './emitir-idproducto.service';

describe('EmitirIDproductoService', () => {
  let service: EmitirIDproductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmitirIDproductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
