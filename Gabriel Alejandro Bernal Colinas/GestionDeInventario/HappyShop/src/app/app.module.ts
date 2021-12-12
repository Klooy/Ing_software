import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common'


//rutas
import { AppRoutingModule } from './app-routing.module';

//componentes
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { InicioComponent } from './inicio/inicio.component';
import { ProductosComponent } from './productos/productos.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { NosotrosComponent } from './info/nosotros/nosotros.component';
import { PrivacypolicyComponent } from './info/privacypolicy/privacypolicy.component';
import { PaypolicyComponent } from './info/paypolicy/paypolicy.component';
import { SendpolicyComponent } from './info/sendpolicy/sendpolicy.component';
import { ReturnpolicyComponent } from './info/returnpolicy/returnpolicy.component';
import { TermsandcoditionsComponent } from './info/termsandcoditions/termsandcoditions.component';
import { AdminComponent } from './administrador/admin/admin.component';
import { AddComponent } from './administrador/add/add.component';
import { EditarComponent } from './administrador/editar/editar.component';



//servicios
import {ArticulosService} from '../app/services/articulos.service'
import {CategoriaService} from '../app/services/categoria/categoria.service'
import {CiudadService} from '../app/services/ciudad/ciudad.service'
import {ClientesService} from '../app/services/clientes/clientes.service'
import {PaisService} from '../app/services/pais/pais.service'
import {PersonaService} from '../app/services/persona/persona.service'
import { UsuariosComponent } from './administrador/usuarios/usuarios.component';
import { EditDireccionComponent } from './cuenta/edit-direccion/edit-direccion.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    InicioComponent,
    ProductosComponent,
    LoginComponent,
    RegistroComponent,
    CuentaComponent,
    NosotrosComponent,
    AdminComponent,
    AddComponent,
    EditarComponent,
    
  
    TermsandcoditionsComponent,
    PrivacypolicyComponent,
    PaypolicyComponent,
    SendpolicyComponent,
    ReturnpolicyComponent,
    UsuariosComponent,
    EditDireccionComponent,
    
  ],
  
    imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      ReactiveFormsModule, 
      FormsModule
    ],
   
  
  providers: [
    ArticulosService,
    CategoriaService,
    CiudadService,
    ClientesService,
    PaisService,
    PersonaService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
