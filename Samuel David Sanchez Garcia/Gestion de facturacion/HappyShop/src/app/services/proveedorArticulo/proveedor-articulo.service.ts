import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { proveedorArticulo } from '../../models/productos'

@Injectable({
  providedIn: 'root'
})
export class ProveedorArticuloService {

  API_URL = 'https://happyshop-serve.herokuapp.com/api'

  constructor(private http:HttpClient) { }

  obtenerTodo(){
    return this.http.get(`${this.API_URL}/proveedorArticulo`); 
  }

  obtenerUnico(id: string){
    return this.http.get(`${this.API_URL}/proveedorArticulo/${id}`);
  }

  eliminar(id: string){
    return this.http.delete(`${this.API_URL}/proveedorArticulo/${id}`)
  }

  guardar(articulo: proveedorArticulo){
    return this.http.post(`${this.API_URL}/proveedorArticulo`, articulo);
  }

  actualizar(id: string, actualizarArticulo: proveedorArticulo){
    return this.http.put(`${this.API_URL}/proveedorArticulo/${id}`, actualizarArticulo);
  }
}
