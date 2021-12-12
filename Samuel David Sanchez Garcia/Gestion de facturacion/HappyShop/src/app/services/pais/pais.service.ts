import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { pais } from '../../models/productos'

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  API_URL = 'https://happyshop-serve.herokuapp.com/api'

  constructor(private http:HttpClient) { }

  obtenerTodo(){
    return this.http.get(`${this.API_URL}/pais`); 
  }

  obtenerUnico(id: string){
    return this.http.get(`${this.API_URL}/pais/${id}`);
  }

  eliminar(id: string){
    return this.http.delete(`${this.API_URL}/pais/${id}`)
  }

  guardar(articulo: pais){
    return this.http.post(`${this.API_URL}/pais`, articulo);
  }

  actualizar(id: string, actualizarArticulo: pais){
    return this.http.put(`${this.API_URL}/pais/${id}`, actualizarArticulo);
  }
}
