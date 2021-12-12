import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { categoria } from '../../models/productos'

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  API_URL = 'https://happyshop-serve.herokuapp.com/api'

  constructor(private http:HttpClient) { }

  obtenerTodo(){
    return this.http.get(`${this.API_URL}/categoria`); 
  }

  obtenerUnico(id: string){
    return this.http.get(`${this.API_URL}/categoria/${id}`);
  }

  eliminar(id: string){
    return this.http.delete(`${this.API_URL}/categoria/${id}`)
  }

  guardar(articulo: categoria){
    return this.http.post(`${this.API_URL}/categoria`, articulo);
  }

  actualizar(id: string, actualizarArticulo: categoria){
    return this.http.put(`${this.API_URL}/categoria/${id}`, actualizarArticulo);
  }
}
