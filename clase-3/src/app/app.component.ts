import { Component } from '@angular/core';
import { ListaProductos } from './components/lista-productos/lista-productos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListaProductos],
  template: `
    <h1>Angular Intermedio – Productos</h1>
    <app-lista-productos></app-lista-productos>
  `,
})
export class AppComponent {}
