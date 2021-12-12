import { Component, OnInit } from '@angular/core';
import { ArticulosService } from '../services/articulos.service'

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  articulo: any = [];

  constructor(private articulosService: ArticulosService) { }

  ngOnInit(): void {
    this.articulosService.obtenerArticulos().subscribe(      
      res => {
        this.articulo = res
               
      },
      er => console.error(er)
    );

  }

}
