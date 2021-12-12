import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { persona } from '../../models/productos'

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  email: string = '';

  API_URL = 'https://happyshop-serve.herokuapp.com/api'

  constructor(private http:HttpClient) { }

  obtenerTodo(){
    return this.http.get(`${this.API_URL}/persona`); 
  }

  obtenerUnico(id: string){
    return this.http.get(`${this.API_URL}/persona/${id}`);
  }

  obtenerTodoUnicaPersona(id: string){
    return this.http.get(`${this.API_URL}/persona/ut/${id}`);
  }
  
  eliminar(id: string){
    return this.http.delete(`${this.API_URL}/persona/${id}`)
  }

  guardar(articulo: persona){
    return this.http.post(`${this.API_URL}/persona`, articulo);
  }

  actualizar(id: string, actualizarArticulo: persona){
    return this.http.put(`${this.API_URL}/persona/${id}`, actualizarArticulo);
  }
}
