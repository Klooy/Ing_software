import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { detallePedido } from '../../models/productos'

@Injectable({
  providedIn: 'root'
})
export class DetallePedidoService {

  API_URL = 'https://happyshop-serve.herokuapp.com/api'

  constructor(private http:HttpClient) { }

  obtenerTodo(){
    return this.http.get(`${this.API_URL}/detallePedido`); 
  }

  obtenerUnico(id: string){
    return this.http.get(`${this.API_URL}/detallePedido/${id}`);
  }

  eliminar(id: string){
    return this.http.delete(`${this.API_URL}/detallePedido/${id}`)
  }

  guardar(articulo: detallePedido){
    return this.http.post(`${this.API_URL}/detallePedido`, articulo);
  }

  actualizar(id: string, actualizarArticulo: detallePedido){
    return this.http.put(`${this.API_URL}/detallePedido/${id}`, actualizarArticulo);
  }
}
