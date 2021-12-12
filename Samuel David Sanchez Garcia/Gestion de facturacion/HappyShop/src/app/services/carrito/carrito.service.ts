import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { carrito } from 'src/app/models/productos';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  @Output() emitirContador: EventEmitter<any> = new EventEmitter();

  totalCom: any;

  API_URL = 'https://happyshop-serve.herokuapp.com/api'

  constructor(private http:HttpClient) { }

  obtenerTodo(){
    return this.http.get(`${this.API_URL}/carrito`); 
  }

  obtenerUnico(id: string){
    return this.http.get(`${this.API_URL}/carrito/${id}`);
  }

  contador(id: string){
    return this.http.get(`${this.API_URL}/carrito/count/${id}`);
  }

  eliminar(id: string){
    return this.http.delete(`${this.API_URL}/carrito/${id}`)
  }

  eliminarTodo(id: string){
    return this.http.delete(`${this.API_URL}/carrito/dtc/${id}`)
  }

  guardar(carrito: carrito){
    return this.http.post(`${this.API_URL}/carrito`, carrito);
  }

  actualizar(id: string, actualizarCarrito: carrito){
    return this.http.put(`${this.API_URL}/carrito/${id}`, actualizarCarrito);
  }
}
