import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { productos } from '../models/productos'

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  API_URL = 'https://happyshop-serve.herokuapp.com/api'

  constructor(private http:HttpClient) { }

  obtenerArticulos(){
    return this.http.get(`${this.API_URL}/productos`); 
  }

  obtenerArticulo(id: string){
    return this.http.get(`${this.API_URL}/productos/${id}`);
  }

  eliminarArticulo(id: string){
    return this.http.delete(`${this.API_URL}/productos/${id}`)
  }

  guardarArticulo(articulo: productos){
    return this.http.post(`${this.API_URL}/productos`, articulo);
  }

  actualizarArticulo(id: string, actualizarArticulo: productos){
    return this.http.put(`${this.API_URL}/productos/${id}`, actualizarArticulo);
  }

}
