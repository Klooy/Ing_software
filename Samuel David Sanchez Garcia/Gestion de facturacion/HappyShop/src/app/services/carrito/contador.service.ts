import { Injectable } from '@angular/core';
import { CarritoService } from './carrito.service';

@Injectable({
  providedIn: 'root'
})
export class ContadorService {

  constructor(private carritoService: CarritoService) { }

  contdor: any;
  
  contador(idCliente: any){
    let datos: any;
    this.carritoService.contador(idCliente).subscribe(
      res => {
        datos = res;
        console.log('contador:', res)
        for(let i = 0; i < datos.length; i++){
          this.contdor = datos[i];          
        }        
        console.log('contador 2:', this.contdor.total);
        
      }, err => console.log(err)
    );
    return this.contdor.total;
  }
}  