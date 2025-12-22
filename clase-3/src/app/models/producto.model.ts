// Contrato de tipado de un producto en la aplicación
export interface Producto {
    id:number,
    nombre: string,
    marca:string,
    precio: number,
    descripcion: string,
    fechaAlta: string,
    stock:number,
}