import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private inicial: Producto[] = [
    {
      id: 1,
      nombre: 'SSD NVMe 1TB',
      marca: 'Kingston',
      precio: 79999,
      descripcion: "Almacenamiento para PC",
      fechaAlta: new Date(2025, 9, 10).toISOString(),
      stock: 12,
    },
    {
      id: 2,
      nombre: 'Router Wi-Fi 6',
      marca: 'TP-Link',
      precio: 65990,
      descripcion: "Dispositivo inalambrico",
      fechaAlta: new Date(2025, 10, 2).toISOString(),
      stock: 6,
    },
    {
      id: 3,
      nombre: 'Auriculares Hs-230u',
      marca: 'Genius',
      precio: 29990,
      descripcion: "Auricular con mic y cable USB",
      stock: 10,
      fechaAlta: new Date(2025, 10, 18).toISOString(),
    },
  ];

  private productosSubject = new BehaviorSubject<Producto[]>([...this.inicial]);
  private nextId = Math.max(...this.inicial.map((p) => p.id)) + 1;

  getProductos(): Observable<Producto[]> {
    return this.productosSubject.asObservable();
  }

  addProducto(producto_parcial: Partial<Producto>): void {
    const actuales = this.productosSubject.getValue();

    const nuevo: Producto = {
      id: this.nextId++,
      nombre: producto_parcial.nombre || '',
      marca: producto_parcial.marca || '',
      precio: producto_parcial.precio ?? 0,
      descripcion: producto_parcial.descripcion || '',
      fechaAlta: producto_parcial.fechaAlta || new Date().toISOString(),
      stock: producto_parcial.stock ?? 0,
    };

    this.productosSubject.next([...actuales, nuevo]);
  }

  deleteProducto(product_id: number): void {
    const filtrados = this.productosSubject.getValue().filter((p) => p.id !== product_id);
    this.productosSubject.next(filtrados);
  }
}
