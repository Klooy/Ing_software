import { Component, OnInit } from '@angular/core';
import { ActiEditDirecService } from 'src/app/services/actiEditDirec/acti-edit-direc.service';
import { CiudadService } from 'src/app/services/ciudad/ciudad.service';
import { PaisService } from 'src/app/services/pais/pais.service';
import { FormControl, FormGroup } from '@angular/forms';
import { persona, cliente } from 'src/app/models/productos';
import { PersonaService } from 'src/app/services/persona/persona.service';
import { ClientesService } from 'src/app/services/clientes/clientes.service';

@Component({
  selector: 'app-edit-direccion',
  templateUrl: './edit-direccion.component.html',
  styleUrls: ['./edit-direccion.component.css']
})
export class EditDireccionComponent implements OnInit {

  ciudad: any;
  pais: any;

  direcForm = new FormGroup({
    pais: new FormControl(''),
    ciudad: new FormControl(''),
    direccion: new FormControl('')
  });

  updateDireccion: persona = {
    idPais: 0,
    idCiudad: 0,
    direccion: ''
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

  cliente: any;
  updateDirecCliente: cliente = {
    direccionFacturacion: ''
  }

  constructor(private actiEditService: ActiEditDirecService, private paisService: PaisService, private ciudadService: CiudadService,
    private personaService: PersonaService, private clienteService: ClientesService) { }

  ngOnInit(): void {

    this.paisService.obtenerTodo().subscribe(
      res => {
        this.pais = res;
      }, err => console.log(err)
    );

    this.ciudadService.obtenerTodo().subscribe(
      res => {
        this.ciudad = res;
      }, err => console.log(err)
    )

    let datos: any;
    this.personaService.obtenerTodoUnicaPersona(this.personaService.email).subscribe(
      res => {
        datos = res;
        
        for(let i = 0; i < datos.length; i++){
          this.datosPersona = datos[i];                      
        }
        let idp = this.datosPersona.idPersona?.toString();
        this.obtenerCliente(idp);
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

  validar(){
    if(this.direcForm.get('pais')?.dirty == true && this.direcForm.get('pais')?.value == ''){
      alert('No selecciono un pais')
    }else if(this.direcForm.get('ciudad')?.dirty == true && this.direcForm.get('ciudad')?.value == ''){
      alert('No selecciono un departamento')
    }else{

      if(this.direcForm.get('pais')?.dirty == true){
        this.updateDireccion.idPais = this.direcForm.get('pais')?.value;
      }else{
        delete this.updateDireccion.idPais;
      }
  
      if(this.direcForm.get('ciudad')?.dirty == true){
        this.updateDireccion.idCiudad = this.direcForm.get('ciudad')?.value;
      }else{
        delete this.updateDireccion.idCiudad;
      }
  
      if(this.direcForm.get('direccion')?.dirty == true){
        this.updateDireccion.direccion = this.direcForm.get('direccion')?.value;
        this.updateDirecCliente.direccionFacturacion = this.direcForm.get('direccion')?.value;
        this.actualizarDirecCliente();
      }else{
        delete this.updateDireccion.direccion;
      }
  
      this.actualizarDatos();
    }

    
  }

  actualizarDatos(){
    let id: any = this.datosPersona.idPersona?.toString();

    this.personaService.actualizar(id, this.updateDireccion).subscribe(
      res => {
        
        alert('Dirección actualizada exitosamente')
        this.cerrar();
      }, err => console.log(err)
    )
  }

  actualizarDirecCliente(){
    let id: any = this.datosPersona.idPersona?.toString();
    this.clienteService.actualizar(id, this.updateDirecCliente).subscribe(
      res => {
        console.log('direccion de cliente actualizada')
      }, err => console.log(err)
    )
  }

  cerrar(){
    this.actiEditService.$modal.emit(false);
  }

}
