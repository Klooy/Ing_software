import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../services/clientes/clientes.service';
import { PersonaService } from '../services/persona/persona.service';
import { persona, cliente, pedido, detallePedido, empresaTransporte, productos } from '../models/productos';
import { PedidoService } from '../services/pedido/pedido.service';
import { DetallePedidoService } from '../services/detallePedido/detalle-pedido.service';
import { EmpresaTransporteService } from '../services/empresaTransporte/empresa-transporte.service';
import { ArticulosService } from '../services/articulos.service';


@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {

  constructor(private personaService: PersonaService, private clienteService: ClientesService, private pedidoService: PedidoService,
    private detallePedidoService: DetallePedidoService, private empresaTService: EmpresaTransporteService, private articuloService: ArticulosService) { }

  datosPersona: persona = {
    idPersona: 0, 
    nombres: '',
    apellidos: '',
    cedula: 0,
    direccion: '',
    telefono: 0,
    email: '',
  };

  cliente : cliente = {};
  datosPedidos: pedido = {};
  datosDetallePedido: detallePedido = {};
  datosEmpresaTransporte: empresaTransporte = {};

  datosArtiArray: any[] = [];
  datosArtiObject: productos = {};
  // datosArtiObject2: any = {
  //   idArticulo: 0,
  //   nombreArticulo: '',
  //   precio: 0, 
  //   cantidad: 0
  // };

  ngOnInit(): void {
    
    let datos: any;
    this.personaService.obtenerTodoUnicaPersona(this.personaService.email).subscribe(
      res => {
        datos = res;
        
        for(let i = 0; i < datos.length; i++){
          this.datosPersona = datos[i];                      
        }
        this.obtenerCliente(this.datosPersona.idPersona);

      }, err => console.error(err)
    );
  }

  idCLiente: any;
  obtenerCliente(idPersona: any){
    let datosCliente: any;
    this.clienteService.obtenerUnico(idPersona).subscribe(
      res => {
        datosCliente = res;

        for(let i = 0; i < datosCliente.length; i++){
          this.cliente = datosCliente[i];                      
        }
        this.idCLiente = this.cliente.idCliente;
        
        this.buscarPedido();
      }, err => console.error(err)
    );
  }

  buscarPedido(){
    let datos: any;
    let idPedido: any;
    this.pedidoService.obtenerUnico(this.idCLiente).subscribe(
      res => {
      datos = res;
      for(let i = 0; i < datos.length; i++){
        this.datosPedidos = datos[i];
      }
      idPedido = this.datosPedidos.idPedido?.toString();
      
      this.buscarDetallePedido(idPedido);
      }, err => console.log("Error",err)
    );
  }

  buscarDetallePedido(idP: string){
    let datos: any;
    this.detallePedidoService.obtenerUnico(idP).subscribe(
      res => {
        datos = res;

        for(let i = 0; i < datos.length; i++){
          this.datosDetallePedido = datos[i];
          
          // this.datosArtiObject2.cantidad = this.datosDetallePedido.cantidad;

          let ida = this.datosDetallePedido.idArticulo?.toString()!;
          this.buscarArticulo(ida);
        }
        let idET = this.datosDetallePedido.idEmpresaTranspor?.toString()!;
        this.buscarEmpresaT(idET)
      }, err => console.log(err)
    );
  }

  buscarEmpresaT(idET: string){
    let datos: any;
    this.empresaTService.obtenerUnico(idET).subscribe(
      res => {
        datos = res;
        for(let i = 0; i < datos.length; i++){
          this.datosEmpresaTransporte = datos[i]
        }
      }, err => console.log(err)
    );
  }

  buscarArticulo(idA: string){
    let datos: any;
    this.articuloService.obtenerArticulo(idA).subscribe(
      res => {
        datos = res;

        for(let i = 0; i < datos.length; i++){
          this.datosArtiObject = datos[i]

          // this.datosArtiObject2.idArticulo = this.datosArtiObject.idArticulo;
          // this.datosArtiObject2.nombreArticulo = this.datosArtiObject.nombreArticulo;
          // this.datosArtiObject2.precio = this.datosArtiObject.precio;

        }
        this.datosArtiArray.push(this.datosArtiObject);

        
      }, err => console.log(err)
    );
  }

}
