import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { ArticulosService } from 'src/app/services/articulos.service';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { PersonaService } from 'src/app/services/persona/persona.service';
import { cliente } from '../../models/productos'
import { Router } from '@angular/router';



@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})

export class CarritoComponent implements OnInit {

  constructor(private pipeDate: DatePipe, private carritoService: CarritoService, private articuloService: ArticulosService,
    private clienteService: ClientesService, private personaService: PersonaService, private router: Router) { }

  fecha = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  fechaCorta = this.pipeDate.transform(this.fecha, "yyyy-MM-dd");

  persona: any;
  cliente: cliente = {
    idCliente: 0,
    direccionFacturacion: '',
    idPersona: 0
  };

  carrito: any = []; 
  


  ngOnInit(): void {
    let datos: any;
    this.personaService.obtenerTodoUnicaPersona(this.personaService.email).subscribe(
      res => {
        datos = res;
        
        for(let i = 0; i < datos.length; i++){
          this.persona = datos[i];                      
        }
        let idPer = this.persona.idPersona.toString();
        this.obtenerCliente(idPer);
        
      }, err => console.error(err)
    );
    
  }

  obtenerCliente(idPersona: any){
    let datosCliente: any;
    this.clienteService.obtenerUnico(idPersona).subscribe(
      res => {
        datosCliente = res;

        for(let i = 0; i < datosCliente.length; i++){
          this.cliente = datosCliente[i];                      
        }
        this.carritoCliente(this.cliente.idCliente);
      }, err => console.error(err)
    );
  }
  datosCarrito: any;
  carritoCliente(idCliente: any){
    let datos: any;
    let totalC: number = 0;
    this.carritoService.obtenerUnico(idCliente).subscribe(
      res => {
        this.datosCarrito = res;
        for(let i = 0; i < this.datosCarrito.length; i++){
          datos = this.datosCarrito[i]
          
          totalC = totalC + datos.total; 
          
          this.totalCompra(totalC);
        }
        
      }, err => console.error(err)
    );
  }

  totalCom: any;
  totalCompra(totapProduct: any){
    this.totalCom = totapProduct;
    this.carritoService.totalCom = this.totalCom;    
  }

  eliminar(id: string){
    
    this.carritoService.eliminar(id).subscribe(
      res => {
        alert('Producto eliminado del carrito');
        this.carritoCliente(this.cliente.idCliente);
      }, err => console.log(err)
    )
  }

  redireccionar(){
    this.router.navigate(['productos/listar-productos'])
  }

  pagar(){
    if(this.totalCom == null){
      alert('No se ha agregado productos al carrito')
    }else{
      this.router.navigate(['cdatos']);
    }
    
  }

  



}
