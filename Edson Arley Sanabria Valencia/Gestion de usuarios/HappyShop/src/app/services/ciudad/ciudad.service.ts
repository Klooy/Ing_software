import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ciudad } from '../../models/productos'

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  API_URL = 'https://happyshop-serve.herokuapp.com/api'

  constructor(private http:HttpClient) { }

  obtenerTodo(){
    return this.http.get(`${this.API_URL}/ciudad`); 
  }

  obtenerUnico(id: string){
    return this.http.get(`${this.API_URL}/ciudad/${id}`);
  }

  eliminar(id: string){
    return this.http.delete(`${this.API_URL}/ciudad/${id}`)
  }

  guardar(articulo: ciudad){
    return this.http.post(`${this.API_URL}/ciudad`, articulo);
  }

  actualizar(id: string, actualizarArticulo: ciudad){
    return this.http.put(`${this.API_URL}/ciudad/${id}`, actualizarArticulo);
  }
}
