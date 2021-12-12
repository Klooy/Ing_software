import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { pedido } from '../../models/productos'

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  API_URL = 'https://happyshop-serve.herokuapp.com/api'

  constructor(private http:HttpClient) { }

  obtenerTodo(){
    return this.http.get(`${this.API_URL}/pedido`); 
  }

  obtenerUnico(id: string){
    return this.http.get(`${this.API_URL}/pedido/${id}`);
  }

  eliminar(id: string){
    return this.http.delete(`${this.API_URL}/pedido/${id}`)
  }

  guardar(articulo: pedido){
    return this.http.post(`${this.API_URL}/pedido`, articulo);
  }

  actualizar(id: string, actualizarArticulo: pedido){
    return this.http.put(`${this.API_URL}/pedido/${id}`, actualizarArticulo);
  }
}
