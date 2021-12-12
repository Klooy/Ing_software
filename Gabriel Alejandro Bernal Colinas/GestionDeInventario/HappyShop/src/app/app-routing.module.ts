import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { CuentaComponent } from './cuenta/cuenta.component';
import { NosotrosComponent } from './info/nosotros/nosotros.component';
import { PaypolicyComponent } from './info/paypolicy/paypolicy.component';
import { PrivacypolicyComponent } from './info/privacypolicy/privacypolicy.component';
import { ReturnpolicyComponent } from './info/returnpolicy/returnpolicy.component';
import { SendpolicyComponent } from './info/sendpolicy/sendpolicy.component';
import { TermsandcoditionsComponent } from './info/termsandcoditions/termsandcoditions.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { ProductosComponent } from './productos/productos.component';
import { RegistroComponent } from './registro/registro.component';
import { AdminComponent } from './administrador/admin/admin.component';
import { AddComponent } from './administrador/add/add.component';
import { EditarComponent } from './administrador/editar/editar.component';
import { UsuariosComponent } from './administrador/usuarios/usuarios.component';


const app_routes: Routes = [
    { path: 'inicio', component: InicioComponent},
    { path: 'productos', component: ProductosComponent,
          children: [

           
          ]},            
    { path: 'cuenta', component: CuentaComponent},
    { path: 'login', component: LoginComponent},
    { path: 'registro', component: RegistroComponent},   
    { path: 'nosotros', component: NosotrosComponent}, 
    { path: 'admin', component: AdminComponent,
        children: [
        { path: 'add', component: AddComponent},
        { path: 'editar', component: EditarComponent},
        { path: 'usuarios', component: UsuariosComponent }
        ]},  
    { path: 'nosotros', component: NosotrosComponent },
    { path: 'politica-pago', component: PaypolicyComponent },
    { path: 'politica-privacidad', component: PrivacypolicyComponent },
    { path: 'politica-retorno', component: ReturnpolicyComponent },
    { path: 'politica-envio', component: SendpolicyComponent },
    { path: 'terminos-condiciones', component: TermsandcoditionsComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'inicio'}
]

@NgModule({
  imports: [RouterModule.forRoot(app_routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
