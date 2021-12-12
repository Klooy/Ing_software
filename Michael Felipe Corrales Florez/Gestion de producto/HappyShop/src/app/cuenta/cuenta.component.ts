import { Component, OnInit } from '@angular/core';
import { ActivarMiCuentaService } from '../services/activar-mi-cuenta.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { persona, pais, ciudad } from '../models/productos';
import { PersonaService } from '../services/persona/persona.service';
import { ClientesService } from '../services/clientes/clientes.service';
import { Router } from '@angular/router';
import { PaisService } from '../services/pais/pais.service';
import { CiudadService } from '../services/ciudad/ciudad.service';
import { ActiEditDirecService } from '../services/actiEditDirec/acti-edit-direc.service';


@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {

  updateDatosForm = new FormGroup({
    nombres: new FormControl('', [Validators.minLength(1), Validators.pattern(/^[a-zA-Z]/)]),
    apellidos: new FormControl('', [Validators.minLength(1), Validators.pattern(/^[a-zA-Z]/)]),   
    telefono: new FormControl('', [Validators.pattern(/^[1-9]\d{9}$/)]),    
    email: new FormControl('', [ Validators.email]),       
    genero: new FormControl('')
  });

  updateContraForm = new FormGroup({
    contraActual: new FormControl('', [Validators.required]),
    contrasena: new FormControl('', [Validators.required]),
    repetirContrasena: new FormControl('', [Validators.required]), 
  });

  updateDatosPersona: persona = {
    nombres: '',
    apellidos: '',   
    telefono: 0,    
    email: '',    
    genero: ''
  }

  updateContra: persona = {
    contrasena: ''
  }

  datosPersona: persona = {
    idPersona: 0, 
    nombres: 'algo',
    apellidos: '',
    cedula: 0,
    direccion: '',
    telefono: 0,
    fechaNacimiento: new Date("0000-00-00"),
    email: '',
    contrasena: '',
    genero: '',
    tipoCuenta: '',
    idCiudad: 0,
    idPais: 0
  };

  
  pais: pais = {
    idPais: 0,
    nombrePais: ''
  };
  ciudad: ciudad = {
    idCiudad: 0,
    idPais: 0,
    nombreCiudad: ''
  };
  cliente: any;

  encecdidoEditDirec: boolean = false;

  constructor(private activarMiCuenta: ActivarMiCuentaService, private personaService: PersonaService, private clienteService: ClientesService,
    private router: Router, private paisService: PaisService, private ciudadService: CiudadService,
    private actiEditService: ActiEditDirecService) { }

  ngOnInit(): void {
    let datos: any;
    this.personaService.obtenerTodoUnicaPersona(this.personaService.email).subscribe(
      res => {
        datos = res;
        
        for(let i = 0; i < datos.length; i++){
          this.datosPersona = datos[i];                      
        }
        this.obtenerCliente(this.datosPersona.idPersona);

        let idp = this.datosPersona.idPais?.toString();
        this.obtenerPais(idp); 

        let idc = this.datosPersona.idCiudad?.toString();  
        this.obtenerCiudad(idc);
      }, err => console.error(err)
    );

    this.actiEditService.$modal.subscribe((valor) => {this.encecdidoEditDirec = valor})
    
  }

  obtenerPais(idp: any){
    
    let datosPais: any;
    this.paisService.obtenerUnico(idp).subscribe(
      res => {
        datosPais = res;

        for(let i = 0; i < datosPais.length; i++){
          this.pais = datosPais[i];
        }
        
      }, err => console.log(err)
    );
  }

  obtenerCiudad(idc: any){
    let datosCiudad: any;
    this.ciudadService.obtenerUnico(idc).subscribe(
      res => {
        datosCiudad = res;

        for(let i = 0; i < datosCiudad.length; i++){
          this.ciudad = datosCiudad[i];
        }
        
      }, err => console.log(err)
    );
  }
  idCliente: any;
  obtenerCliente(idPersona: any){
    let datosCliente: any;
    this.clienteService.obtenerUnico(idPersona).subscribe(
      res => {
        datosCliente = res;

        for(let i = 0; i < datosCliente.length; i++){
          this.cliente = datosCliente[i];                      
        }
        this.idCliente = this.cliente.idCliente;
      }, err => console.error(err)
    );
  }

  validar(){
    if(this.updateDatosForm.get('nombres')?.dirty == true){
      this.updateDatosPersona.nombres = this.updateDatosForm.get('nombres')?.value;   
    }else{
      delete this.updateDatosPersona.nombres;
    }

    if(this.updateDatosForm.get('apellidos')?.dirty == true){
      this.updateDatosPersona.apellidos = this.updateDatosForm.get('apellidos')?.value;      
    }else{
      delete this.updateDatosPersona.apellidos;
    }

    if(this.updateDatosForm.get('telefono')?.dirty == true){
      this.updateDatosPersona.telefono = this.updateDatosForm.get('telefono')?.value;   
    }else{
      delete this.updateDatosPersona.telefono;
    }

    if(this.updateDatosForm.get('email')?.dirty == true){
      this.updateDatosPersona.email = this.updateDatosForm.get('email')?.value;      
    }else{
      delete this.updateDatosPersona.email;
    }

    if(this.updateDatosForm.get('genero')?.dirty == true){
      this.updateDatosPersona.genero = this.updateDatosForm.get('genero')?.value;      
    }else{
      delete this.updateDatosPersona.genero;
    }
    
    this.actualizarDatos();
  }

  actualizarDatos(){
    let id: any = this.datosPersona.idPersona?.toString();
    
    this.personaService.actualizar(id, this.updateDatosPersona).subscribe(
      res => {
        alert("Datos actualizados")
      }, err => console.log(err)
    );
    
    
  }

  validarCambioContra(){
    if(this.datosPersona.contrasena != this.updateContraForm.get('contraActual')?.value){
      alert('La contraseña actual no coincide');
    }else if(this.updateContraForm.get('contraActual')?.value == this.updateContraForm.get('contrasena')?.value){
      alert('La nueva contraseña no puede ser igual a la actual');
    }else if(this.updateContraForm.get('contrasena')?.value != this.updateContraForm.get('repetirContrasena')?.value){
      alert('No se pudo confirmar la nueva contraseña')
    }else{
      this.updateContra.contrasena = this.updateContraForm.get('contrasena')?.value;
      this.actualizarContrasena();
      this.updateContraForm.reset();
    }
  }

  actualizarContrasena(){
    let id: any = this.datosPersona.idPersona?.toString();
    this.personaService.actualizar(id, this.updateContra).subscribe(
      res => {
        alert("Cambio de contraseña exitoso")
      }, err => console.log(err)
    );
  }

  

  abrirEditDirec(){
    this.encecdidoEditDirec = true; 
  }

  

}
