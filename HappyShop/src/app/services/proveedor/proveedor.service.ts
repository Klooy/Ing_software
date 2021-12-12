import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { proveedor } from '../../models/productos'

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  API_URL = 'https://happyshop-serve.herokuapp.com/api'

  constructor(private http:HttpClient) { }

  obtenerTodo(){
    return this.http.get(`${this.API_URL}/proveedor`); 
  }

  obtenerUnico(id: string){
    return this.http.get(`${this.API_URL}/proveedor/${id}`);
  }

  eliminar(id: string){
    return this.http.delete(`${this.API_URL}/proveedor/${id}`)
  }

  guardar(articulo: proveedor){
    return this.http.post(`${this.API_URL}/proveedor`, articulo);
  }

  actualizar(id: string, actualizarArticulo: proveedor){
    return this.http.put(`${this.API_URL}/proveedor/${id}`, actualizarArticulo);
  }
}
