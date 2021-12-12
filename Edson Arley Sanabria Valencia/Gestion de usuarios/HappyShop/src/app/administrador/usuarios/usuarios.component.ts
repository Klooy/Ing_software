import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/services/persona/persona.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  datosPersona: any = [];

  buscarForm = new FormGroup({
    email: new FormControl('', Validators.email)
  })

  constructor(private personaService: PersonaService) { }

  ngOnInit(): void {
    this.personaService.obtenerTodo().subscribe(
      res => {
        this.datosPersona = res;       
               
      }, err => console.error(err)
    )
  }

  buscar(){
    this.personaService.obtenerTodoUnicaPersona(this.buscarForm.get('email')?.value).subscribe(
      res => {
        this.datosPersona = res;
        this.buscarForm.reset();
      }, (error) => {console.error(error);}
    );
  }

  mostrarTodos(){
    this.personaService.obtenerTodo().subscribe(
      res => {
        this.datosPersona = res;       
               
      }, err => console.error(err)
    )
  }

}
