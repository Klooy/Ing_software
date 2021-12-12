import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms'
import { productos } from '../../models/productos'
import { ArticulosService } from '../../services/articulos.service'
import { CategoriaService } from '../../services/categoria/categoria.service'


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  idCategoria: any = [];

  productForm = new FormGroup({
    nombreArticulo: new FormControl('',[Validators.required, Validators.minLength(1), Validators.pattern(/^[a-zA-Z]/)]),
    descripcion: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]/), Validators.minLength(1)]),
    precio: new FormControl('', [Validators.required, Validators.pattern(/^[1-9]\d/)]),
    imagen: new FormControl('', [Validators.required, Validators.pattern(/^(ftp|http|https):\/\/[^ "]+$/)]),
    idCategoria: new FormControl('', [Validators.required])
  });

  producto: productos = {
    idArticulo: 0,
    nombreArticulo: '',
    descripcion: '',
    precio: 0,
    existencias: 'si',
    imagen: '',
    idCategoria: 0
  }

  constructor(private articuloService: ArticulosService, private categorariaService: CategoriaService) { }

  ngOnInit(): void {
    this.categorariaService.obtenerTodo().subscribe(
      res => {
        this.idCategoria = res;
        
      }, 
      er => console.error(er)
    );
  }

  validar(){
    this.producto.nombreArticulo = this.productForm.get("nombreArticulo")?.value;
    this.producto.descripcion = this.productForm.get("descripcion")?.value;
    this.producto.precio = this.productForm.get("precio")?.value;
    this.producto.imagen = this.productForm.get("imagen")?.value;
    this.producto.idCategoria = this.productForm.get("idCategoria")?.value;
    this.guardar(this.producto);
    this.productForm.reset();
  }

  
  guardar(datosProducto: productos){
    delete datosProducto.idArticulo;
    
    this.articuloService.guardarArticulo(datosProducto).subscribe(
      res => {
        alert("PRODUCTO GUARDADO")
        console.log(res);
      },
      er => console.log(er)
    );
  }
}
