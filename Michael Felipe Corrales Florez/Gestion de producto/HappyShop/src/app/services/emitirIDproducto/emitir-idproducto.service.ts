import { Injectable, Output, EventEmitter  } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmitirIDproductoService {

  @Output() emitirID: EventEmitter<any> = new EventEmitter();

  constructor() { }
}
