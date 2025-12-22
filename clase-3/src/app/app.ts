import { Component, signal } from '@angular/core';
import { ListaProductos } from './components/lista-productos/lista-productos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListaProductos],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}