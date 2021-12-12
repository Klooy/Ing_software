import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { cliente } from '../../models/productos'

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  API_URL = 'https://happyshop-serve.herokuapp.com/api'

  constructor(private http:HttpClient) { }

  obtenerTodo(){
    return this.http.get(`${this.API_URL}/clientes`); 
  }

  obtenerUnico(id: string){
    return this.http.get(`${this.API_URL}/clientes/${id}`);
  }

  eliminar(id: string){
    return this.http.delete(`${this.API_URL}/clientes/${id}`)
  }

  guardar(articulo: cliente){
    return this.http.post(`${this.API_URL}/clientes`, articulo);
  }

  actualizar(id: string, actualizarArticulo: cliente){
    return this.http.put(`${this.API_URL}/clientes/${id}`, actualizarArticulo);
  }
}
