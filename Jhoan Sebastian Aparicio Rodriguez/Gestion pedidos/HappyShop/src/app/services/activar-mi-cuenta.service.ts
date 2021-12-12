import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivarMiCuentaService {

  activar: boolean = true;
  activarAdmi: boolean = true;
  
  constructor() { }
}
