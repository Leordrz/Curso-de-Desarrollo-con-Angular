import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  titulo = 'Mi primera app en Angular';
  nombre = 'Leonel Rodríguez';
  motivo = 'Busco ampliar mis conocimientos en el mundo IT y el Desarrollo WEB';
  fuente= "/elmo.gif"
  Terminar(){
    this.titulo = "Unidad 1 Terminada";
    this.fuente = "/elmo-saluda.gif"
  }
}
