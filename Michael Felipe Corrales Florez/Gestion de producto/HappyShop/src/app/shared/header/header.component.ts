import { Component, OnInit } from '@angular/core';
import { ActivarMiCuentaService } from 'src/app/services/activar-mi-cuenta.service';
import { InfoPaginaService } from 'src/app/services/info-pagina.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  
  constructor(public _infoPagina: InfoPaginaService, public activarMiCuenta: ActivarMiCuentaService) { }

  ngOnInit(): void {
    
  }

  
}
