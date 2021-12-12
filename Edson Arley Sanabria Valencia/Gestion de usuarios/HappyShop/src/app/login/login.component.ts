import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ActivarMiCuentaService } from '../services/activar-mi-cuenta.service';
import { PersonaService } from '../services/persona/persona.service';

import { FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  persona: any = [];

  loginForm = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    contrasena : new FormControl('', Validators.required)
  })

  

  constructor(private activarMiCuenta: ActivarMiCuentaService, private personaService: PersonaService, private router: Router) { }

  ngOnInit(): void {
    
  }
  
  activar(email: any){
    this.activarMiCuenta.activar = false;
    this.personaService.email = email;
  }
  
  activarAdmi(){
    this.activarMiCuenta.activarAdmi = false;
  }
  

  enLogin({email, contrasena}: cuenta){
    this.validarCamposVacios(email, contrasena);
    // console.log("Correo:",email);
    // console.log("contraseña:", contraseña)
    
  }

  validarCamposVacios(email:string, contra:string){
    if(email == "" && contra == ""){
      alert("Campos vacios");

    }else if(email == "" || contra == ""){
      alert("Campos vacios");
    }else{
      this.obtenerValor(email, contra);
    }
  }

  obtenerValor(val:string, contra: string){
    //console.warn(val)
    this.personaService.obtenerUnico(val).subscribe(      
      res => {
        this.persona = res;
        for(let i = 0; i < this.persona.length; i++){
          // console.log("en for:", this.persona[i]);
          const datos = this.persona[i];
          
          if(val == datos.email){
            this.validarApi(this.persona[i], val, contra);
          }
        }
        
           
      },
      er => console.error(er, alert(er))
      
    );
  }
  
  validarApi({email, contrasena, tipoCuenta}: cuenta, emailInput: string, contraInput: string){
    
    
    if(contrasena != contraInput){
      alert("Contraseña incorrecta");
      // console.log("comprovacion contraseña de api:", contraseña);
      // console.log("de input:", contraInput);
    }else{
      // console.log("id persona:", idPersona);
      this.activar(email);
      this.router.navigate(['inicio']);
    }
    if(tipoCuenta == "administrador"){
      //console.log("cuenta:",tipoCuenta);
      this.activarAdmi();
    }
    
  }

  

}



export interface cuenta{
    idPersona: string,
    email: string;
    contrasena: string;
    tipoCuenta: string;
}
