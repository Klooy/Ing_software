import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { empresaTransporte } from '../../models/productos'

@Injectable({
  providedIn: 'root'
})
export class EmpresaTransporteService {

  API_URL = 'https://happyshop-serve.herokuapp.com/api'

  constructor(private http:HttpClient) { }

  obtenerTodo(){
    return this.http.get(`${this.API_URL}/empresaTransporte`); 
  }

  obtenerUnico(id: string){
    return this.http.get(`${this.API_URL}/empresaTransporte/${id}`);
  }

  eliminar(id: string){
    return this.http.delete(`${this.API_URL}/empresaTransporte/${id}`)
  }

  guardar(articulo: empresaTransporte){
    return this.http.post(`${this.API_URL}/empresaTransporte`, articulo);
  }

  actualizar(id: string, actualizarArticulo: empresaTransporte){
    return this.http.put(`${this.API_URL}/empresaTransporte/${id}`, actualizarArticulo);
  }
}
