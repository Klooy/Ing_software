import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { persona, cliente } from '../models/productos';
import { CiudadService } from '../services/ciudad/ciudad.service';
import { PaisService } from '../services/pais/pais.service';
import { PersonaService } from '../services/persona/persona.service';
import { ClientesService } from '../services/clientes/clientes.service';
import { DatePipe } from '@angular/common'
import { Router } from '@angular/router';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  ciuda: any = [];
  pais: any = [];

  persona: any = [];
 

  registrosForm = new FormGroup({
    nombres: new FormControl('', [Validators.required, Validators.minLength(1), Validators.pattern(/^[a-zA-Z]/)]),
    apellidos: new FormControl('', [Validators.required, Validators.minLength(1), Validators.pattern(/^[a-zA-Z]/)]),
    cedula: new FormControl('', [Validators.required, Validators.pattern(/^[1-9]\d{7,9}$/)]),
    direccion: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.pattern(/^[1-9]\d{9}$/)]),
    fechaNacimiento: new FormControl('', [Validators.required ]), //validacionesEspeciales.validarFecha
    email: new FormControl('', [Validators.required, Validators.email]),
    contrasena: new FormControl('', [Validators.required]),
    repetirContrasena: new FormControl('', [Validators.required]),
    idCiudad: new FormControl('', [Validators.required]),
    idPais: new FormControl('', [Validators.required]),
    genero: new FormControl('')
  })

  perso: persona = {
    idPersona: 0, 
    nombres: '',
    apellidos: '',
    cedula: 0,
    direccion: '',
    telefono: 0,
    fechaNacimiento: new Date("0000-00-00"),
    email: '',
    contrasena: '',
    genero: '',
    tipoCuenta: 'cliente',
    idCiudad: 0,
    idPais: 0
  }

  client: cliente = {
    idCliente: 0,
    direccionFacturacion: '',
    idPersona: 0
  }

  public fechaMinima!: Date;
  public fechaMinimastr!: any;
  public fechaMaxima!: Date;
  public fechaMaximastr!: any;

  constructor(private personaService: PersonaService, private ciudad: CiudadService, private paisService: PaisService, 
    private pipeFecha: DatePipe, private router: Router, private clienteService: ClientesService) { }

  ngOnInit(): void {
    this.ciudad.obtenerTodo().subscribe(      
      res => {
        this.ciuda = res,
        console.log(res)             
      },
      er => console.error(er)
    );

    this.paisService.obtenerTodo().subscribe(      
      res => {
        this.pais = res,
        console.log(res)             
      },
      er => console.error(er)
    );

    this.fechaMinima = new Date(new Date().getFullYear()-18, new Date().getMonth(), new Date().getDate()); 
    this.fechaMinimastr = this.pipeFecha.transform(this.fechaMinima, "yyyy-MM-dd");

    this.fechaMaxima = new Date(new Date().getFullYear()-80, new Date().getMonth(), new Date().getDate());   
    this.fechaMaximastr = this.pipeFecha.transform(this.fechaMinima, "yyyy-MM-dd");
      
    
  }

  validar(){
    
    // console.log("formGroup:", this.registrosForm.value)
    if(this.registrosForm.get("contrasena")?.value != this.registrosForm.get("repetirContrasena")?.value){
      alert("la contraseña no coincide")
    }else{
      
      this.perso.nombres = this.registrosForm.get("nombres")?.value;
      this.perso.apellidos = this.registrosForm.get("apellidos")?.value;
      this.perso.cedula = this.registrosForm.get("cedula")?.value;
      this.perso.direccion = this.registrosForm.get("direccion")?.value;
      this.perso.telefono = this.registrosForm.get("telefono")?.value;
      this.perso.fechaNacimiento = this.registrosForm.get("fechaNacimiento")?.value;
      this.perso.email = this.registrosForm.get("email")?.value;
      this.perso.contrasena = this.registrosForm.get("contrasena")?.value;
      this.perso.genero = this.registrosForm.get("genero")?.value;
      this.perso.idCiudad = this.registrosForm.get("idCiudad")?.value;
      this.perso.idPais = this.registrosForm.get("idPais")?.value;
      // console.log("pasando de redistrosForm a perso:", this.perso);
      this.guardar(this.perso);
    }
    
    
  }

  guardar(datosPersona: persona){
    delete datosPersona.idPersona;
    
    //console.log("enviando:", datosPersona);
    this.personaService.guardar(datosPersona).subscribe(res => {
      console.log(res);
      this.obtenerIdPersona();
      
    },
    err => console.log(err));
  }

  obtenerIdPersona(){

    this.personaService.obtenerUnico(this.registrosForm.get("email")?.value).subscribe(
      res => {
        this.persona = res;
        for(let i = 0; i < this.persona.length; i++){
          this.guardarCliente(this.persona[i]);
        }
      },
      er => console.error(er)
    );

  //   let nomCiudad: any;
  //   let datosCiuda: any;
  //   let nomPa: any;
  //   let datosPais: any;

  //   this.ciudad.obtenerUnico(this.registrosForm.get("idCiudad")?.value).subscribe(      
  //     res => {
  //       nomCiudad = res;
  //       for(let i = 0; i < nomCiudad.length; i++){
  //         datosCiuda = nomCiudad[i];                    
  //       }
  //       console.log("ciudad:",datosCiuda.nombreCiudad);
                     
  //     },
  //     er => console.error(er)
  //   );

  //   this.paisService.obtenerUnico(this.registrosForm.get("idPais")?.value).subscribe(      
  //     res => {
  //       nomPa = res;
  //       for(let i = 0; i < nomPa.length; i++){
  //         datosPais = nomPa[i];                    
  //       }  
  //       console.log("pais:",datosPais.nombrePais);
  //     },
  //     er => console.error(er)
  //   );
    
  //   let pais: string = datosPais.nombrePais + datosCiuda.nombreCiudad;

  //   console.log("union pais y ciudad:", pais);
   }

   guardarCliente({idPersona}: clien){
    delete this.client.idCliente;
    this.client.direccionFacturacion = this.registrosForm.get("direccion")?.value;
    this.client.idPersona = idPersona;
    
    this.clienteService.guardar(this.client).subscribe( res =>{
      console.log(res);
      this.router.navigate(['inicio']);
    },
    er => console.error(er)
    );
   }

}

interface clien{
  idPersona: number
}

// class validacionesEspeciales{

//   public static validarFecha(elemento: FormControl){
//     let texto = elemento.value;

//     let invalido: boolean = false;

//     let aux: Date = new Date(texto);
//     let fechaSelecionada: Date = new Date(aux.getUTCFullYear(), aux.getUTCMonth(), aux.getUTCDate());

//     // invalido = (fechaSelecionada > new Date(new Date().getFullYear()-80, new Date().getMonth(), new Date().getDate()) || fechaSelecionada < new Date(new Date().getFullYear()-18, new Date().getMonth(), new Date().getDate()))

    

   
//     console.log("texto fecha:", texto);
//     console.log("fecha seleccionada:", fechaSelecionada);
//     console.log("invalido:", invalido);

//     return invalido ?{fechaInvalida:true}:null; 
//   }

  
// }