import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validator, Validators} from '@angular/forms';
import {categoria, productos} from '../../models/productos';
import {ArticulosService} from '../../services/articulos.service';
import {CategoriaService} from '../../services/categoria/categoria.service'


@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  idcategoria: any=[];
  idarticulo: any=[];  

  productForm= new FormGroup({
    idProducto: new FormControl('',[Validators.required]),
    nombreArticulo: new FormControl('', [Validators.minLength(3), Validators.pattern(/^[a-zA-Z]/)]),
    descripcion: new FormControl('',[ Validators.minLength(20)]),
    precio: new FormControl('',[Validators.pattern(/^[1-9]\d{3,9}$/)]),
    existencias: new FormControl(''),
    categorias: new FormControl(''),
    imagen:new FormControl('', [Validators.pattern(/^(ftp|http|https):\/\/[^ "]+$/)])


  });

  producto : productos ={
    idArticulo: 0,
    nombreArticulo: '',
    descripcion: '',
    precio: 0,
    existencias: '',
    imagen: '',
    idCategoria: 0

  }

  categoria: categoria = {
    idCategoria: 0,
    nombre: '',
    descripcion: ''
  };

  constructor(private articuloService: ArticulosService, private categoriaService: CategoriaService ) { }

  ngOnInit(): void {
    this.categoriaService.obtenerTodo().subscribe(
      res => {
        this.idcategoria=res;
        
      },
    er => console.error(er)
    );
    this.articuloService.obtenerArticulos().subscribe(
      res => {
         this.idarticulo= res;
      },
      er => console.error(er)
     
    );
  }


  mostrarDatosProducto(idp: any){
    let datos: any;
    this.articuloService.obtenerArticulo(idp).subscribe(
      res => {
        datos = res;

        for(let i = 0; i < datos.length; i++){
          this.producto = datos[i];                      
        }  
        this.mostrarCategoriaProducto(this.producto.idCategoria);
      }, err => console.error(err)
    );
  }

  mostrarCategoriaProducto(idC: any){
    let datos: any;
    this.categoriaService.obtenerUnico(idC).subscribe(
      res => {
        datos = res;

        for(let i = 0; i < datos.length; i++){
          this.categoria = datos[i];                               
        } 

      }, err => console.error(err)
    );
  }

  quitarValores(){
    this.producto.nombreArticulo = '';
    this.producto.descripcion = '';
    this.producto.existencias = '';
    this.producto.imagen = '';
    this.producto.precio = 0;
    this.categoria.nombre = '';
  }

  validarCamposVacios(){

  }

  validar(){

    this.producto.idArticulo = this.productForm.get("idProducto")?.value;

    if(this.productForm.get("nombreArticulo")?.dirty == true){
      this.producto.nombreArticulo = this.productForm.get("nombreArticulo")?.value;
    }else{
      delete this.producto.nombreArticulo;
    }

    if(this.productForm.get("descripcion")?.dirty == true){
      this.producto.descripcion = this.productForm.get("descripcion")?.value;
    }else{
      delete this.producto.descripcion;
    }

    if(this.productForm.get("precio")?.dirty == true){
      this.producto.precio = this.productForm.get("precio")?.value;
    }else{
      delete this.producto.precio;
    }

    if(this.productForm.get("existencia")?.dirty == true){
      this.producto.existencias = this.productForm.get("existencia")?.value;
    }else{
      delete this.producto.existencias;
    }

    if(this.productForm.get("categorias")?.dirty == true){
      this.producto.idCategoria = this.productForm.get("categorias")?.value;
    }else{
      delete this.producto.idCategoria;
    }

    if(this.productForm.get("imagen")?.dirty == true){
      this.producto.imagen = this.productForm.get("imagen")?.value;
    }else{
      delete this.producto.imagen;
    }

    this.editar(this.producto);
    
    
  }
  idArti: any = '';
  editar(datosProducto : productos){
    this.idArti = datosProducto.idArticulo;
    this.articuloService.actualizarArticulo(this.idArti , datosProducto).subscribe(
      res=> {
        alert("Producto editado")
        console.log(res)
      },
      er => console.error(er)
    );
    this.productForm.reset();
  }

  validarBorrar(){
    this.producto.idArticulo = this.productForm.get("idProducto")?.value;    
    this.eliminar(this.producto)
  }

  eliminar(datoProducto: productos){
    this.idArti = datoProducto.idArticulo;
    this.articuloService.eliminarArticulo(this.idArti).subscribe(
      res =>{
        alert("Producto Eliminado")
        console.log(res)
      },
      er=> console.error(er)
    );

    this.productForm.reset();

  }

}
