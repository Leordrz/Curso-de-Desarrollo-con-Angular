import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Contador } from './contador/contador';
import { Registro } from './registro/registro';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Contador,
    Registro
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  titulo = 'Mi primera app en Angular';
  nombre = 'Leonel Rodríguez';
  motivo = 'Busco ampliar mis conocimientos en el mundo IT y el Desarrollo Web';
  fuente = '/elmo.gif';

  Terminar() {
    this.titulo = 'Unidad 2 terminada';
    this.fuente = 'elmo-saluda.gif';
  }

}