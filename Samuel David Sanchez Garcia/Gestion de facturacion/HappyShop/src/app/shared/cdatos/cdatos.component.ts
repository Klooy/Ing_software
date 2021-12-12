import { Component, OnInit } from '@angular/core';
import { persona, cliente, pedido, detallePedido } from 'src/app/models/productos';
import { PersonaService } from 'src/app/services/persona/persona.service';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { EmpresaTransporteService } from 'src/app/services/empresaTransporte/empresa-transporte.service';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { FormGroup, FormControl } from '@angular/forms';
import swal from'sweetalert2';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { DetallePedidoService } from 'src/app/services/detallePedido/detalle-pedido.service';



@Component({
  selector: 'app-cdatos',
  templateUrl: './cdatos.component.html',
  styleUrls: ['./cdatos.component.css']
})
export class CdatosComponent implements OnInit {

  fecha = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  fechaCorta = this.pipeDate.transform(this.fecha, "yyyy-MM-dd");

  constructor(private personaService : PersonaService, private clienteService: ClientesService , private empresaTransporte : EmpresaTransporteService,
    private carritoService: CarritoService, private pedidoService: PedidoService, private pipeDate: DatePipe, private router: Router,
    private detallePService: DetallePedidoService  ) { }
    

  datosPersona: persona = {
    idPersona: 0, 
    nombres: '',
    apellidos: '',
    cedula: 0,
    direccion: '',
    telefono: 0,
    email: '',
  };

  direcForm = new FormGroup({
    direccion: new FormControl(''),
    metodoEntrega: new FormControl(''),
    metodoPago: new FormControl(''),
    empresaTranspor: new FormControl('')
  })

  cliente : cliente = {

  };

  updateCliente: cliente = {
    direccionFacturacion: ''
  }

  empresas : any;
  total: number = 0;
  totalN: number = 0;

  idPersona: any;
  


  mensaje: string ='';

  pedido: pedido = {
    descuento: 0,
    fecha: new Date(""),
    total: 0,
    idCliente: 0
  }

  datosPedidos: any;

  detallePedido: detallePedido = {
    metodoPago: '',
    metodoEntrega: '',
    idPedido: 0,
    idEmpresaTranspor: 0,
    idArticulo: 0,
    cantidad: 0
  }

  ngOnInit(): void {
    let datos: any;
    this.personaService.obtenerTodoUnicaPersona(this.personaService.email).subscribe(
      res => {
        datos = res;
        
        for(let i = 0; i < datos.length; i++){
          this.datosPersona = datos[i];                      
        }
        this.obtenerCliente(this.datosPersona.idPersona);

        this.idPersona = this.datosPersona.idPersona
      }, err => console.error(err)
    );

    this.empresaTransporte.obtenerTodo().subscribe(
      res => {
       this.empresas = res;
        

      }, err => console.error(err)
      
    );

    this.total = this.carritoService.totalCom;
    this.totalN = this.total;
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
        this.carritoCliente(this.cliente.idCliente);
      }, err => console.error(err)
    );
  }

  datosCarrito: any;
  carritoCliente(idCliente: any){
    let datos: any;    
    this.carritoService.obtenerUnico(idCliente).subscribe(
      res => {
        this.datosCarrito = res;
        for(let i = 0; i < this.datosCarrito.length; i++){
          datos = this.datosCarrito[i]
        }
        
      }, err => console.error(err)
    );
  }

// prioridad de envio

  normal(){
    this.totalN = this.total;
    // let porcentaje: number;
    // porcentaje = this.total * 0.1;
    this.totalN = this.totalN + 2000;
  }

  
  prioritario(){
    this.totalN = this.total;
    // let porcentaje: number;
    // porcentaje = this.total * 0.5;
    this.totalN = this.totalN + 10000;
  }

  //fin prioridad de envio

  validacion(){
    if(this.direcForm.get("direccion")?.dirty == true){
      this.updateCliente.direccionFacturacion = this.direcForm.get("direccion")?.value;
      
      this.clienteService.actualizar(this.idPersona, this.updateCliente).subscribe(
        res => {
          console.log("cambio direccion facturacion");
          
        }, err => console.log(err)
      );
    }
    if(this.direcForm.get("metodoEntrega")?.pristine == true){
      alert("No se ha seleccionado un metodo de entrega");
      
    }else if(this.direcForm.get("metodoEntrega")?.dirty == true && this.direcForm.get("metodoEntrega")?.value == "seleccione"){
      alert("No se ha seleccionado un metodo de entrega");
    }
    else if(this.direcForm.get("metodoPago")?.pristine == true){
      alert("No se ha seleccionado un metodo de pago");
      
    }else if(this.direcForm.get("metodoPago")?.dirty == true && this.direcForm.get("metodoPago")?.value == "seleccione"){
      alert("No se ha seleccionado un metodo de pago");
    }
    else if(this.direcForm.get("empresaTranspor")?.pristine == true){
      alert("No se ha seleccionado una empresa de transporte");
      
    }else if(this.direcForm.get("empresaTranspor")?.dirty == true && this.direcForm.get("empresaTranspor")?.value == "seleccione"){
      alert("No se ha seleccionado una empresa de transporte");
    }
    else{
      
      this.pedido.fecha = this.fecha;
      this.pedido.total = this.totalN;
      this.pedido.idCliente = this.idCLiente
      this.guardarPedido();
      
      // this.mensajeGuardado();
    }
  }

  guardarPedido(){
    this.pedidoService.guardar(this.pedido).subscribe(
      res => {
        this.buscarPedido();
      }, err => console.log(err)
    );
    
  }


  buscarPedido(){
    let datos: any;
    this.pedidoService.obtenerUnico(this.idCLiente).subscribe(
      res => {
      datos = res;
      for(let i = 0; i < datos.length; i++){
        this.datosPedidos = datos[i];
      }
      this.guardarDetallePedido();
      }, err => console.log("Error",err)
    );
  }

  guardarDetallePedido(){
    let datos: any;
    
    for(let i = 0; i < this.datosCarrito.length; i++){
      datos = this.datosCarrito[i]

      let idEP = this.direcForm.get("empresaTranspor")?.value;
      let idEPn = parseInt(idEP)

      this.detallePedido.metodoPago = this.direcForm.get('metodoPago')?.value;
      this.detallePedido.metodoEntrega = this.direcForm.get('metodoEntrega')?.value;
      this.detallePedido.idEmpresaTranspor = idEPn;
      this.detallePedido.idPedido = this.datosPedidos.idPedido;
      this.detallePedido.idArticulo = datos.idArticulo;
      this.detallePedido.cantidad = datos.cantidad;
      
      this.detallePService.guardar(this.detallePedido).subscribe(
        res => {
          console.log('pedido hecho', i)
        }, err => console.log(err)
      );

    }

    this.eliminarCarrito();
    this.mensajeGuardado();
  
  }

  eliminarCarrito(){
    this.carritoService.eliminarTodo(this.idCLiente).subscribe(
      res => {
        console.log('eliminado carrito')
      }, err => console.log(err)
    )
  }

  mensajeGuardado(){
    swal.fire({
      title: 'Pedido Registrado',
      text: "Cualquier inconveniente use el servicio al cliente de telegram",
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Telegram',
      cancelButtonText: 'Ver factura'
    }).then((result) => {
      if (result.isConfirmed) {
       location.href= "https://t.me/+p80eYEi8f0tjMzIx"
      }else{
        // this.router.navigate(['inicio']);
        this.router.navigate(['factura'])
      }
    })
  }
  
}
