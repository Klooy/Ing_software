export interface productos{

    idArticulo?: number;
    nombreArticulo?: string;
    descripcion?: string;
    precio?: number;
    existencias?: string;
    imagen?: string;
    idCategoria?: number;
}



export interface persona{
    idPersona?: number;
    nombres?: string;
    apellidos?: string;
    cedula?: number;
    direccion?: string;
    telefono?: number;
    fechaNacimiento?: Date;
    email?: string;
    contrasena?: string;
    genero?: string;
    tipoCuenta?: string;
    idCiudad?: number;
    idPais?: number;
}

export interface cliente {
    idCliente?: number;
    direccionFacturacion?: string;
    idPersona?: number;
}

export interface ciudad {
    idCiudad?: number;
    nombreCiudad?: string;
    idPais?: number;
}

export interface pais {
    idPais?: number;
    nombrePais?: string;    
}

export interface categoria {
    idCategoria?: number;
    nombre?: string;
    descripcion?: string;
}

export interface carrito {
    id?: number;
    cantidad?: number;
    idArticulo?: number;
    idCliente?: number;
}

export interface pedido{

    idPedido?: number;
    cantidad?: number;
    descuento?: number;
    fecha?: Date;
    total?: number;
    idCliente?: number;
}

export interface detallePedido {
    idDetallePedido?: number;
    metodoPago?: string;
    metodoEntrega?: string;
    idPedido?: number;
    idEmpresaTranspor?: number;
    idArticulo?: 0,
    cantidad?: 0;
}

export interface proveedorArticulo {
    id?: number;
    idProveedor?: number;
    idArticulo?: number;
}

export interface proveedor {
    idProveedor?: number;
    nit?: number;
    nombreProveedor?: string;
    telefono?: number;
    email?: string;
}

export interface empresaTransporte {
    idEmpresaTranspor?: number;
    nombre?: string;
    nit?: number;
    telefono?: number;
    email?: string;
}

