import { Component, OnInit } from '@angular/core';
import { ArticulosService } from '../services/articulos.service';
import { productos } from '../models/productos';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivarMiCuentaService } from '../services/activar-mi-cuenta.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonaService } from '../services/persona/persona.service';
import { ClientesService } from '../services/clientes/clientes.service';
import { CarritoService } from '../services/carrito/carrito.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {

  datosArticulo: any;
  persona: any;
  cliente: any;
  articulo: productos = {
    idArticulo: 0,
    nombreArticulo: 'Nombre articulo',
    descripcion: '',
    precio: 10,
    existencias: '',
    imagen: '',
    idCategoria: 0
  };

  carrito: any = {
    cantidad: 1,
    idArticulo: 0,
    idCliente: 0,
    nombreArticulo: '',
    total: 0,
    precio: 0
  }

  cantidadForm = new FormGroup({
    cantidad: new FormControl('1',[ Validators.minLength(1), Validators.maxLength(5), Validators.min(1), Validators.max(5)])
  })

  constructor(private articuloService: ArticulosService, private activatedRoute: ActivatedRoute, private router: Router,
    public activarService: ActivarMiCuentaService, private personaService: PersonaService, private clienteService: ClientesService,
    private carritoService: CarritoService) { }

  ngOnInit(): void {
    
    const params = this.activatedRoute.snapshot.params;
    
    if(params.id){
      this.articuloService.obtenerArticulo(params.id).subscribe(
        res => {
          //console.log(res);
          this.datosArticulo = res;
          for(let i = 0; i < this.datosArticulo.length; i++){          
              
              this.articulo = this.datosArticulo[i];
              
          }
        },
        er => console.error(er)
      )
    }

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
        
      }, err => console.error(err)
    );
  }

  validar(num: number){
    let total: any;
    if(this.activarService.activar == true){
      alert('Inicie sesión para acceder a la compra')
    }else{
      
      this.carrito.cantidad = this.cantidadForm.get("cantidad")?.value;
      this.carrito.idArticulo = this.articulo.idArticulo;
      this.carrito.idCliente = this.cliente.idCliente;
      this.carrito.nombreArticulo = this.articulo.nombreArticulo;
      this.carrito.precio = this.articulo.precio;
      total = this.carrito.cantidad * this.carrito.precio;
      this.carrito.total = total;
      
      if(num == 0){
        this.agregarCarrito(this.carrito);
      }else{
        this.agregarCarrito(this.carrito);
        this.router.navigate(['carrito']);
      }
      
    }
  }

  agregarCarrito(carrito: any){
    this.carritoService.guardar(carrito).subscribe(
      res => {
        alert('Agregado al carrito')
      }, err => console.log(err)
    );

  }


}

