import { Component, OnInit } from '@angular/core';
import { ActivarMiCuentaService } from 'src/app/services/activar-mi-cuenta.service';
import { InfoPaginaService } from 'src/app/services/info-pagina.service';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { PersonaService } from 'src/app/services/persona/persona.service';
import { ContadorService } from 'src/app/services/carrito/contador.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  // persona: any;
  // cliente: any;
  contadorCarrito: any;
  constructor(public _infoPagina: InfoPaginaService, public activarMiCuenta: ActivarMiCuentaService, public carritoService: CarritoService,
    private clienteServise: ClientesService, private personaService: PersonaService, private contadorService: ContadorService ) { }

  ngOnInit(): void {
    // let datos: any;
    // this.personaService.obtenerTodoUnicaPersona(this.personaService.email).subscribe(
    //   res => {
    //     datos = res;
        
    //     for(let i = 0; i < datos.length; i++){
    //       this.persona = datos[i];                      
    //     }
    //     let idPer = this.persona.idPersona.toString();
    //     this.obtenerCliente(idPer);
        
    //   }, err => console.error(err)
    // );

    // this.contadorCarrito(this.cliente.idCliente);

    // let timerId = setInterval(() => this.contadorCarrito = this.contadorService , 2000);
    // console.log('timerid', timerId)
    // console.log('contador', this.contadorCarrito)
  }

  
  // obtenerCliente(idPersona: any){
  //   let datosCliente: any;
  //   this.clienteServise.obtenerUnico(idPersona).subscribe(
  //     res => {
  //       datosCliente = res;

  //       for(let i = 0; i < datosCliente.length; i++){
  //         this.cliente = datosCliente[i];                      
  //       }
        
  //     }, err => console.error(err)
  //   );
  // }

  // contador: any;
  // public contadorCarrito(idCiente: string){
  //   this.carritoService.contador(idCiente).subscribe(
  //     res => {
  //       console.log('conrador', res);
  //     }, err => console.log(err)
  //   )
  // }
  
}
