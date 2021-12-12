import { Component, Input, OnInit } from '@angular/core';
import { ArticulosService } from '../../services/articulos.service'
import { Router } from '@angular/router';
import { EmitirIDproductoService } from 'src/app/services/emitirIDproducto/emitir-idproducto.service';
import { ActivarMiCuentaService } from 'src/app/services/activar-mi-cuenta.service';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { PersonaService } from 'src/app/services/persona/persona.service';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { ContadorService } from 'src/app/services/carrito/contador.service';


@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {

  articulo: any = [];
  idProduc: string = '';

  persona: any;
  cliente: any;
  
  constructor(private articulosService: ArticulosService, private router: Router, private emitirIDservice: EmitirIDproductoService,
    public activarService: ActivarMiCuentaService, private clienteServise: ClientesService, private personaService: PersonaService,
    private carritoService: CarritoService, private contadorService: ContadorService) { }

  ngOnInit(): void {
    this.articulosService.obtenerArticulos().subscribe(      
      res => {
        this.articulo = res      
        
        for(let i = 0; i < this.articulo.length; i++){          
          
          this.idProduc = this.articulo[i].idArticulo;
        }        
      },
      er => console.error(er)
    );

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
    this.clienteServise.obtenerUnico(idPersona).subscribe(
      res => {
        datosCliente = res;

        for(let i = 0; i < datosCliente.length; i++){
          this.cliente = datosCliente[i];                      
        }
        
      }, err => console.error(err)
    );
  }

  public detalles(id: string){
    
    this.emitirIDservice.emitirID.emit({ data: id });
    this.router.navigate(['productos/detalle-producto/', id]);
    
  }


  arti: any;
  agreArticu: any;
  carrito: any = {
    cantidad: 1,
    idArticulo: 0,
    idCliente: 0,
    nombreArticulo: '',
    total: 0,
    precio: 0
  }

  validar(idArti: any){
    let total: any;

    if(this.activarService.activar == true){
      alert("Inicie sesión para acceder a la compra");      
    }else{
      this.articulosService.obtenerArticulo(idArti).subscribe(
        res => {
          this.arti = res;
          for(let i = 0; i < this.arti.length; i++){
            this.agreArticu = this.arti[i]
          }
          this.carrito.idArticulo = this.agreArticu.idArticulo;
          this.carrito.idCliente = this.cliente.idCliente;
          this.carrito.nombreArticulo = this.agreArticu.nombreArticulo;
          this.carrito.total = this.agreArticu.precio;
          this.carrito.precio = this.agreArticu.precio;
          console.log('info articulo:', this.carrito);
          
          this.agregarCarrito(this.carrito);
        }, err => console.error(err)
      )
      
    }
  }

  agregarCarrito(carrito: any){

    this.carritoService.guardar(carrito).subscribe(
      res => {
        // this.contadorService.contador(this.cliente.idCliente);
        // this.contador(this.cliente.idCliente);
        alert('Agregado al carrito')
      }, err => console.log(err)
    );
  }
  // contdor: any;
  
  // contador(idCliente: any){
  //   let datos: any;
  //   this.carritoService.contador(idCliente).subscribe(
  //     res => {
  //       datos = res;
  //       console.log('contador:', res)
  //       for(let i = 0; i < datos.length; i++){
  //         this.contdor = datos[i];          
  //       }
        
  //       console.log('contador 2:', this.contdor.total);
        
  //     }, err => console.log(err)
  //   )
  // }
}
