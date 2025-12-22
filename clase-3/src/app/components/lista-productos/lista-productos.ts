import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { ProductosService } from './../../services/productos';
import { Producto } from '../../models/producto.model';
import { DescuentoPipe } from '../../pipes/descuento-pipe';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [CommonModule, DescuentoPipe],
  templateUrl: './lista-productos.html',
  styleUrl: './lista-productos.css',
})
export class ListaProductos implements OnInit, OnDestroy {
  products: Producto[] = [];
  loading = true;

  porcentaje_descuento = 12;

  private sub?: Subscription;

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.sub = this.productosService.getProductos().subscribe((lista) => {
      this.products = lista;
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  eliminar(id: number): void {
    this.productosService.deleteProducto(id);
  }

  simularAgregarProducto(): void {
    this.productosService.addProducto({
      nombre: 'Teclado mecánico',
      marca: 'Red Dragon',
      precio: 54990,
      descripcion: 'Color rojo, retroiluminado',
      fechaAlta: new Date().toISOString(),
      stock: 9,
    });
  }

  limpiar(): void {
    this.products.forEach((p) => this.productosService.deleteProducto(p.id));
  }
}
